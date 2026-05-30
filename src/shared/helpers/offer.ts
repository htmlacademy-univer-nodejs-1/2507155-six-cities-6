import { AmenityType, City, HousingType, Location, Offer, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [title, description, city, previewImage, images, isPremium, housingType, roomsCount, guestsCount, price, amenities,
    name, email, userType, location] = offerData.replace('\n', '').split('\t');

  const parseBoolean = (value: string): boolean => value === 'true';
  const parseInt = (value: string): number => Number.parseInt(value, 10);
  const parseLocation = (value: string): Location => {
    const [latitude, longitude] = value.split(';').map(Number);
    return { latitude, longitude };
  };

  const housingTypeCapitalize = housingType.charAt(0).toUpperCase() + housingType.slice(1);
  return {
    title,
    description,
    city: City[city as keyof typeof City],
    previewImage,
    housingImages: images.split(';'),
    isPremium: parseBoolean(isPremium),
    housingType: HousingType[housingTypeCapitalize as keyof typeof HousingType], // TODO сделать маппинг строк в энумы
    roomsCount: parseInt(roomsCount),
    guestsCount: parseInt(guestsCount),
    price: parseInt(price),
    amenities: amenities.split(';').map((convenience) => AmenityType[convenience as keyof typeof AmenityType]),
    author: {
      name: name,
      email: email,
      type: UserType[userType as keyof typeof UserType]
    },
    location: parseLocation(location)
  };
}
