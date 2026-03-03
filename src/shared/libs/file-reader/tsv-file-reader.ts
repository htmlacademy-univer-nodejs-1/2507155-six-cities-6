import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { AmenityType, HousingType, Location, Offer, UserType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    const parseBoolean = (value: string): boolean => value === 'true';
    const parseInt = (value: string): number => Number.parseInt(value, 10);
    const parseFloat = (value: string): number => Number.parseFloat(value);
    const parseLocation = (value: string): Location => {
      const [latitude, longitude] = value.split(';').map(Number);
      return { latitude, longitude };
    };

    let test = this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'));

    let test2 = test.map(([title, description, createdDate, city, previewImage, images, isPremium, isFavorite, rating, housingType, roomsCount, guestsCount, price, amenities,
            name, email, avatarPath, userType, location]) => ({
        title,
        description,
        publishDate: new Date(createdDate),
        city,
        previewImage,
        housingImages: images.split(';'),
        isPremium: parseBoolean(isPremium),
        isFavorite: parseBoolean(isFavorite),
        rating: parseFloat(rating),
        housingType: HousingType[housingType as keyof typeof HousingType], // TODO сделать маппинг строк в энумы
        roomsCount: parseInt(roomsCount),
        guestsCount: parseInt(guestsCount),
        price: parseInt(price),
        amenities: amenities.split(';').map((convenience) => AmenityType[convenience as keyof typeof AmenityType]),
        author: {
          name: name,
          email: email,
          avatar: avatarPath || undefined,
          type: UserType[userType as keyof typeof UserType]
        },
        commentsCount: 0,
        location: parseLocation(location)
      }));

    return test2;

  }
}
