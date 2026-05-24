import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { AmenityType, City, HousingType, Location } from '../../../types/index.js';
import { OfferValidationMessages } from './offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: OfferValidationMessages.title.minLength })
  @MaxLength(100, { message: OfferValidationMessages.title.maxLength })
  public title: string;

  @MinLength(20, { message: OfferValidationMessages.description.minLength })
  @MaxLength(1024, { message: OfferValidationMessages.description.maxLength })
  public description: string;

  @IsEnum(City, { message: OfferValidationMessages.city.invalidFormat })
  public city: City;

  @MaxLength(256, { message: OfferValidationMessages.previewImage.maxLength }) // TODO IsUrl?
  public previewImage: string;

  @IsArray({ message: OfferValidationMessages.housingImages.invalidFormat })
  @ArrayMinSize(6, { message: OfferValidationMessages.housingImages.size })
  @ArrayMaxSize(6, { message: OfferValidationMessages.housingImages.size })
  public housingImages: string[];

  @IsBoolean({ message: OfferValidationMessages.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(HousingType, { message: OfferValidationMessages.housingType.invalidFormat })
  public housingType: HousingType;

  @IsInt({ message: OfferValidationMessages.roomsCount.invalidFormat })
  @Min(1, { message: OfferValidationMessages.roomsCount.minValue })
  @Max(8, { message: OfferValidationMessages.roomsCount.maxValue })
  public roomsCount: number;

  @IsInt({ message: OfferValidationMessages.guestsCount.invalidFormat })
  @Min(1, { message: OfferValidationMessages.guestsCount.minValue })
  @Max(10, { message: OfferValidationMessages.guestsCount.maxValue })
  public guestsCount: number;

  @IsInt({ message: OfferValidationMessages.price.invalidFormat })
  @Min(100, { message: OfferValidationMessages.price.minValue })
  @Max(100000, { message: OfferValidationMessages.price.maxValue })
  public price: number;

  @IsArray({ message: OfferValidationMessages.amenities.isArray })
  @IsEnum(AmenityType, { each: true, message: OfferValidationMessages.amenities.invalidFormat })
  public amenities: AmenityType[];

  // TODO валидатор для координат?
  public location: Location;

  public userId: string;
}
