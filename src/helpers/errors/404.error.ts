import { BaseError } from './base.error';

export default class Error404 extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}
