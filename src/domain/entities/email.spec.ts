import { Error400 } from '../errors/400';
import { Email } from './email';

describe('Email entity', () => {
  it('Should Approve and format the email', () => {
    const emailFake = 'john.Doe@email.com ';
    const email = new Email(emailFake);
    expect(email.value).toBe(emailFake.trim().toLowerCase());
  });
  it('Should REPROVE invalid email', () => {
    const emailFake = 'john.Doeemail.com';

    expect(() => new Email(emailFake)).toThrow(Error400);
  });
  it('Should REPROVE due to the email is undefined', () => {
    const emailFake = undefined;
    expect(() => new Email(emailFake)).toThrow(Error400);
  });
});
