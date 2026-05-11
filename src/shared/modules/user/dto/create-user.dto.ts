import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import { UserType } from '../../../types/user-type.enum.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.firstname.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.firstname.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatar?: string;

  @IsEnum(UserType, { message: CreateUserMessages.avatarPath.invalidFormat })
  public type: UserType;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
