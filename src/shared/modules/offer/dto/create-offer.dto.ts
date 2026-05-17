import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { AmenityType, City, HousingType, Location } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city: City;

  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.housingImages.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.housingImages.size })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.housingImages.size })
  public housingImages: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  public isFavorite?: boolean; // TODO должен ли этот параметр передаваться при создании предложения?? есть же отдельные ручки для управления избранными

  @IsEnum(HousingType, { message: CreateOfferValidationMessage.housingType.invalidFormat })
  public housingType: HousingType;

  @IsInt({ message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  public roomsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsCount.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsCount.maxValue })
  public guestsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.isArray })
  @IsEnum(AmenityType, { each: true, message: CreateOfferValidationMessage.amenities.invalidFormat })
  public amenities: AmenityType[];

  public userId: string;

  // TODO валидатор для координат?
  public location: Location;
}
