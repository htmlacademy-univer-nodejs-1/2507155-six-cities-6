import { AmenityType, HousingType, Location } from '../../../types/index.js';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
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
  public city?: string;

  @IsOptional()
  @IsString({ message: CreateUpdateOfferMessage.image.invalidFormat })
  @MaxLength(256, { message: CreateUpdateOfferMessage.image.maxLength })
  public previewImage?: string;

  @IsOptional()
  public housingImages?: string[];

  @IsOptional()
  public isPremium?: boolean;

  @IsOptional()
  public isFavorite?: boolean; // TODO должен ли этот параметр передаваться при создании предложения?? есть же отдельные ручки для управления избранными

  @IsOptional()
  @IsEnum(HousingType, { message: CreateUpdateOfferMessage.type.invalidFormat })
  public housingType?: HousingType;

  @IsOptional()
  public roomsCount?: number;

  @IsOptional()
  public guestsCount?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.min })
  @Max(20000, { message: CreateUpdateOfferMessage.price.max })
  public price?: number;

  @IsOptional()
  public amenities?: AmenityType[];

  @IsOptional()
  public location?: Location;
}
