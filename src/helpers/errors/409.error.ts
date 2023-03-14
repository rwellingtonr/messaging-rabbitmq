import { BaseError } from './base.error';

export default class Error409 extends BaseError {
  constructor(message: string) {
    super(message, 409);
  }
}
