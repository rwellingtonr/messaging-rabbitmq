export class BaseError extends Error {
  code?: string;
  constructor(description: string, readonly status: number) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;
    Error?.captureStackTrace(this);
  }
}
