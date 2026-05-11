import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod, HttpRequest, RequestQuery, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { PreviewOfferRdo } from './rdo/preview-offer.rdo.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferIdRequestParam } from './types/offerId-request-param.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentRdo, CommentService, CreateCommentDto, CreateCommentRequest } from '../comment/index.js';
import { CityRequestParam } from './types/city-request-param.type.js';
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exists.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Registering routes for OfferController...');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateOfferDto)] });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show, middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.indexPremium });
    this.addRoute({ path: '/favorite', method: HttpMethod.Get, handler: this.indexFavorite });
    this.addRoute({ path: '/:offerId/favorite', method: HttpMethod.Post, handler: this.addToFavorite, middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/:offerId/favorite', method: HttpMethod.Delete, handler: this.removeFromFavorite, middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments, middlewares: [ new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId') ] });
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Post, handler: this.createComment, middlewares: [ new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(CreateCommentDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId') ] });
  }

  public async index(
    { query }: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.find(query.limit);
    this.ok(res, fillDTO(PreviewOfferRdo, offers));
  }

  public async show(
    { params }: Request<OfferIdRequestParam>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    { body }: HttpRequest<CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    { params }: Request<OfferIdRequestParam>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.deleteById(params.offerId);

    await this.commentService.deleteByOfferId(params.offerId);
    this.noContent(res, offer);
  }

  public async update(
    { params, body }: Request<OfferIdRequestParam, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async indexPremium(
    { params }: Request<CityRequestParam>,
    res: Response
  ): Promise<void> {
    // TODO проверку на города
    const premiumOffers = await this.offerService.findPremiumByCity(params.city);
    this.ok(res, fillDTO(PreviewOfferRdo, premiumOffers));
  }

  public async indexFavorite(
    _req: Request,
    res: Response
  ): Promise<void> {
    const favoriteOffers = await this.offerService.findFavorite();
    this.ok(res, fillDTO(PreviewOfferRdo, favoriteOffers));
  }

  public async addToFavorite(
    { params }: Request<OfferIdRequestParam>,
    res: Response
  ): Promise<void> {
    await this.offerService.addToFavorite(params.offerId);
    this.created(res, void 0);
  }

  public async removeFromFavorite(
    { params }: Request<OfferIdRequestParam>,
    res: Response
  ): Promise<void> {
    await this.offerService.removeFromFavorite(params.offerId);
    this.noContent(res, void 0);
  }

  public async getComments({ params }: Request<OfferIdRequestParam>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async createComment(
    { body, params }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const comment = await this.commentService.create(params.offerId, body);
    await this.offerService.incCommentCount(params.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  // TODO calculateRating?
  // TODO exists?
}
