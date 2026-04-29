import { Expose } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { PreviewOfferRdo } from './preview-offer.rdo.js';

export class OfferRdo extends PreviewOfferRdo {
  @Expose()
  description: string;

  @Expose()
  housingImages: string[];

  @Expose()
  roomsCount: number;

  @Expose()
  guestsCount: number;

  @Expose()
  amenities: string[];

  @Expose()
  author: UserRdo;

  @Expose()
  location: {
    latitude: number;
    longitude: number;
  };
};
