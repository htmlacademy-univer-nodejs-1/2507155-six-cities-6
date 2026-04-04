import { OfferType } from '../../../types/index.js';

export class UpdateOfferDto { // TODO
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public image?: string;
  public type?: OfferType;
  public price?: number;
  public categories?: string[];
}
