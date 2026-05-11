export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  rating: {
    invalid: 'rating must be a integer',
    min: 'minimum rating value must be 1',
    max: 'maximum rating value must be 5'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;
