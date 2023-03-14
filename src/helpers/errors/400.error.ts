import { BaseError } from './base.error';

export default class Error400 extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}
