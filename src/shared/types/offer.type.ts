import { User } from './user.type.js';
import { HousingType } from './housing-type.enum.js';
import { AmenityType } from './amenity-type.enum.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city: string;
  previewImage: string;
  housingImages: string[]; // TODO [string, string, string, string, string, string] ??
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  amenities: AmenityType[];
  author: User;
  commentsCount: number,
  location: Location;
};
