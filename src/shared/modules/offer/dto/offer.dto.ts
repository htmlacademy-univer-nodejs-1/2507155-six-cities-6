import { UserDto } from "../../user/dto/user.dto.js";
import { PreviewOfferDto } from "./preview-offer.dto.js";

export type OfferFullDto = PreviewOfferDto & {
  description: string;
  housingImages: string[];
  roomsCount: number;
  guestsCount: number;
  amenities: string[];
  author: UserDto;
  location: {
    latitude: number;
    longitude: number;
  };
};
