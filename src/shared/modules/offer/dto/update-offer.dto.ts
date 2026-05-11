import { AmenityType, City, HousingType, Location } from '../../../types/index.js';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10,{ message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsEnum(City, { message: CreateUpdateOfferMessage.city.invalidFormat })
  public city?: City;

  @IsOptional()
  @IsString({ message: CreateUpdateOfferMessage.previewImage.invalidFormat })
  @MaxLength(256, { message: CreateUpdateOfferMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.housingImages.invalidFormat })
  @ArrayMinSize(6, { message: CreateUpdateOfferMessage.housingImages.size })
  @ArrayMaxSize(6, { message: CreateUpdateOfferMessage.housingImages.size })
  public housingImages?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  public isFavorite?: boolean; // TODO должен ли этот параметр передаваться при создании предложения?? есть же отдельные ручки для управления избранными

  @IsOptional()
  @IsEnum(HousingType, { message: CreateUpdateOfferMessage.housingType.invalidFormat })
  public housingType?: HousingType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.roomsCount.minValue })
  @Max(8, { message: CreateUpdateOfferMessage.roomsCount.maxValue })
  public roomsCount?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.guestsCount.minValue })
  @Max(10, { message: CreateUpdateOfferMessage.guestsCount.maxValue })
  public guestsCount?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.amenities.isArray })
  @IsEnum(AmenityType, { each: true, message: CreateUpdateOfferMessage.amenities.invalidFormat })
  public amenities?: AmenityType[];

  @IsOptional()
  public location?: Location;
}
