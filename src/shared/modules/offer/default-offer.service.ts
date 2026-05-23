import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { CommentEntity } from '../comment/comment.entity.js';
import { FavoriteEntity } from '../favorite/index.js';
import { PipelineStage, Types } from 'mongoose';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const [offer] = await this.offerModel.aggregate([
      { $match: { _id: new Types.ObjectId(offerId) } },
      ...this.userPopulatePipeline(),
      ...this.getFavoritePipeline(userId)
    ]);

    return offer ?? null;
  }

  public async find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .aggregate([
        { $sort: { createdAt: SortType.Down } },
        { $limit: limit },
        ...this.getFavoritePipeline(userId)
      ])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async findPremiumByCity(city: string, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        { $match: { city, isPremium: true } },
        { $sort: { createdAt: SortType.Down } },
        { $limit: PREMIUM_OFFER_COUNT },
        ...this.getFavoritePipeline(userId)
      ])
      .exec();
  }

  public async findFavorite(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...this.getFavoritePipeline(userId),
        { $match: { isFavorite: true } }
      ])
      .exec();
  }

  public async addToFavorite(offerId: string, userId: string): Promise<void> {
    await this.favoriteModel
      .updateOne(
        { userId, offerId },
        { userId, offerId },
        { upsert: true }
      )
      .exec();
  }

  public async removeFromFavorite(offerId: string, userId: string): Promise<void> {
    await this.favoriteModel
      .deleteOne({ userId, offerId })
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': { commentCount: 1, }}).exec();
  }

  public async calculateRating(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const avgRating = await this.commentModel
      .aggregate([
        {
          $match: {
            offerId: offerId,
          },
        },
        {
          $group: {
            _id: '$offerId',
            avgRating: { $avg: '$rating' },
          },
        },
      ])
      .exec();
    const rating = avgRating.length > 0 ? avgRating[0].avgRating : 0;
    return this.offerModel
      .findByIdAndUpdate(offerId, { rating: rating })
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async getOwnerId(documentId: string): Promise<string | null> {
    const offer = await this.offerModel
      .findById(documentId)
      .select('userId')
      .exec();

    return offer ? offer.userId.toString() : null;
  }

  //

  private userPopulatePipeline(): PipelineStage[] { // TODO вынести в отдельный файл
    return [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId'
        }
      },
      {
        $unwind: '$userId'
      }
    ];
  }

  private getFavoritePipeline(userId?: string): PipelineStage[] {
    if (!userId) {
      return [
        {
          $addFields: {
            isFavorite: false
          }
        }
      ];
    }

    return [
      {
        $lookup: {
          from: 'favorites',
          let: {
            offerId: '$_id'
          },
          pipeline: [
            {
              $match: {
                userId: new Types.ObjectId(userId),
                $expr: {
                  $eq: ['$offerId', '$$offerId']
                }
              }
            }
          ],
          as: 'favorites'
        }
      },
      {
        $addFields: {
          isFavorite: {
            $gt: [{ $size: '$favorites' }, 0]
          }
        }
      },
      {
        $project: {
          favorites: 0
        }
      }
    ];
  }
}

