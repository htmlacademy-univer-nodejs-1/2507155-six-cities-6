import { Expose } from 'class-transformer';

export class PreviewOfferRdo {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  publishDate: Date;

  @Expose()
  city: string;

  @Expose()
  previewImage: string;

  @Expose()
  isPremium: boolean;

  @Expose()
  isFavorite: boolean;

  @Expose()
  housingType: string;

  @Expose()
  price: number;

  @Expose()
  rating: number;

  @Expose()
  commentsCount: number;
};
