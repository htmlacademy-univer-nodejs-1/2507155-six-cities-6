import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { AmenityType, HousingType, Location } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  public city: string; // TODO enum?

  @MaxLength(256, { message: CreateOfferValidationMessage.image.maxLength })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.categories.invalidFormat })
  public housingImages: string[]; // TODO строго 6

  public isPremium: boolean;

  public isFavorite?: boolean; // TODO должен ли этот параметр передаваться при создании предложения?? есть же отдельные ручки для управления избранными

  @IsEnum(HousingType, { message: CreateOfferValidationMessage.type.invalid })
  public housingType: HousingType;

  public roomsCount: number;

  public guestsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(200000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.categories.invalidFormat })
  public amenities: AmenityType[];

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId: string;

  public location: Location;
}
