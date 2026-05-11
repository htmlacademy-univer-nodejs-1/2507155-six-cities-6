import { IsMongoId, IsString, Length } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat }) // TODO допилить везде валидацию
  @Length(5, 1024, { message: 'min is 5, max is 1024 '})
  public text: string;

  public rating: number;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public userId: string;
}
