export const CreateUpdateOfferMessage = { // TODO объединить и оставить только CreateOfferValidationMessage?
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  city: {
    invalidFormat: 'city must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf'
  },
  previewImage: {
    invalidFormat: 'image is required',
    maxLength: 'too long for field image. Maximum length is 256'
  },
  housingImages: {
    invalidFormat: 'housingImages must be an array',
    size: 'housingImages length must be 6'
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean type'
  },
  housingType: {
    invalidFormat: 'housingType must be apartment, house, room or hotel'
  },
  roomsCount: {
    invalidFormat: 'roomsCount must be an integer',
    minValue: 'Minimum roomsCount value must be 1',
    maxValue: 'Maximum roomsCount value must be 8'
  },
  guestsCount: {
    invalidFormat: 'guestsCount must be an integer',
    minValue: 'Minimum guestsCount value must be 1',
    maxValue: 'Maximum guestsCount value must be 10'
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'Minimum price value must be 100',
    maxValue: 'Maximum price value must be 100000'
  },
  amenities: {
    isArray: 'amenities must be an array',
    invalidFormat: 'amenities items must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge'
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
