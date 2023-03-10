import { Error400 } from '../errors/400';

export class Email {
  private readonly _email: string;

  constructor(email: string) {
    this.validateEmail(email);
    const formattedEmail = this.formatEmail(email);

    this._email = formattedEmail;
  }

  private validateEmail(email: string) {
    if (!email) {
      throw new Error400('Email is required');
    }

    const emailBasePatter = /([\w\d\-_.]+@[\w\d-_.]+)/i;
    const isValidEmail = emailBasePatter.test(email);
    if (!isValidEmail) {
      throw new Error400('Invalid email format');
    }
  }

  private formatEmail(email: string): string {
    const formattedEmail = email.trim().toLowerCase();
    return formattedEmail;
  }

  public get value(): string {
    return this._email;
  }
}
