import { Expose } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  publishDate: string;

  @Expose()
  rating: number;

  @Expose()
  author: UserRdo;
};
