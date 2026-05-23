import { HttpError } from '../../../libs/rest/index.js';

export class BaseAuthException extends HttpError { // TODO переименовать exception в error?
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}
