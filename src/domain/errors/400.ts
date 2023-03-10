export class Error400 extends Error {
  constructor(message: string) {
    super(`BAD REQUEST: ${message}`);
  }
}
