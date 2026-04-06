import { AmenityType, HousingType, Location } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public city: string;
  public previewImage: string;
  public housingImages: string[];
  public isPremium: boolean;
  public isFavorite?: boolean;   // TODO а должен ли этот параметр на самом деле передаваться при создании предложения??
  public housingType: HousingType;
  public roomsCount: number;
  public guestsCount: number;
  public price: number;
  public amenities: AmenityType[];
  public authorId: string;
  public location: Location;
}
