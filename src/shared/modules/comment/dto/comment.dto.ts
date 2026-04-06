import { UserDto } from "../../user/dto/user.dto.js";

export type CommentDto = {
  id: string;
  text: string;
  publishDate: string; // TODO дату редактирования? (эта дтошка идет в ответ пользователю)
  rating: number;
  author: UserDto;
};
