import { Email } from './email.entity';
import { faker } from '@faker-js/faker';
import Error400 from '~/helpers/errors/400.error';

describe('Email Entity', () => {
  it('Should REPROVE, missing email', () => {
    const fakeEmail = undefined;

    expect(() => new Email(fakeEmail)).toThrow(Error400);
  });
  it('Should REPROVE, invalid email', () => {
    const fakeEmail = 'johnDoe.gmail.com';

    expect(() => new Email(fakeEmail)).toThrow(Error400);
  });
  it('Should APPROVE email', () => {
    const randomEmail = faker.internet.email();
    const email = new Email(randomEmail);
    expect(email.value).toBe(randomEmail);
  });
});
