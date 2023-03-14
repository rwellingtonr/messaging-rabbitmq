import { faker } from '@faker-js/faker';
import { Username } from './userName.entity';

describe('Username Entity', () => {
  it('Should capitalize the user name', () => {
    const fakeName = faker.name.firstName();
    const username = new Username(fakeName);

    const expectedResult = fakeName.replace(/\w/, (match) =>
      match.toUpperCase(),
    );

    expect(username.value).toBe(expectedResult);
  });
});
