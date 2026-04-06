import { UserDto } from '../../user/dto/user.dto.js';

export type CommentDto = {
  id: string;
  text: string;
  publishDate: string;
  rating: number;
  author: UserDto;
};
