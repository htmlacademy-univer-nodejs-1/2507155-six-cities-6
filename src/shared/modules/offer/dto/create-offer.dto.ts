import { AmenityType, HousingType, Location } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public city: string;
  public previewImage: string;
  public housingImages: string[]; // TODO строго 6
  public isPremium: boolean;
  public isFavorite?: boolean; // TODO должен ли этот параметр передаваться при создании предложения?? есть же отдельные ручки для управления избранными
  public housingType: HousingType;
  public roomsCount: number;
  public guestsCount: number;
  public price: number;
  public amenities: AmenityType[];
  public userId: string;
  public location: Location;
}
