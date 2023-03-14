import Error400 from '~/helpers/errors/400.error';

export class Email {
  private readonly _email: string;

  constructor(email: string) {
    this.validateEmail(email);
    this._email = email;
  }

  private validateEmail(email: string) {
    if (!email) {
      throw new Error400('Email is required');
    }

    const patternToValidateEmail =
      /([\w\d\-_.]+@[\w\d\-_]+\.\w{2,3}(?:\.br)?)/i;

    const isAValidEmail = patternToValidateEmail.test(email);

    if (!isAValidEmail) {
      throw new Error400('Invalid email');
    }
  }

  public get value(): string {
    return this._email;
  }
}
