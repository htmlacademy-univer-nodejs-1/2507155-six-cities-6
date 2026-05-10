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
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class DefaultOfferService implements OfferService { // TODO не забыть потом про валидацию данных
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.OfferModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result.populate(['userId']);
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate(['userId']) // TODO а нужен ли тут populate для userId?
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

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city: city, isPremium: true })
      .sort({ createdAt: SortType.Down })
      .limit(PREMIUM_OFFER_COUNT)
      .exec();
  }

  public async findFavorite(): Promise<DocumentType<OfferEntity>[]> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'TODO реализовать'); // TODO пока не понятно, как функциональность должна работать, поэтому не трогаю
  }

  public async addToFavorite(offerId: string): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'TODO реализовать', offerId);
  }

  public async removeFromFavorite(offerId: string): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'TODO реализовать', offerId);
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
}
