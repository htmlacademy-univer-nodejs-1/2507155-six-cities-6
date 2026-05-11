export const CreateLoginUserMessage = { // TODO объединить с CreateUserMessages?
  email: {
    invalidFormat: 'email must be a valid address',
  },
  password: {
    invalidFormat: 'password is required',
  }
} as const;
