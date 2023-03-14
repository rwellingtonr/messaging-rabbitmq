import { faker } from '@faker-js/faker';
import { Email } from './email.entity';
import { User } from './user.entity';
import { Username } from './userName.entity';

describe('User entity', () => {
  it('Should create an user', () => {
    const user = new User({
      email: new Email(faker.internet.email()),
      first_name: new Username(faker.name.firstName()),
      last_name: new Username(faker.name.lastName()),
    });
    user.createUser();
    expect(user.createdAt).toBeTruthy();
  });
});
