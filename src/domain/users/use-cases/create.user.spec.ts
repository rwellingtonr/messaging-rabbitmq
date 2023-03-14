import { faker } from '@faker-js/faker';
import { UserRepositoryInMemory } from '~/infra/repository/in-memory/user.in-memory';
import { CreateUser } from './create.user';

describe('Create user service', () => {
  let repository: UserRepositoryInMemory;
  let createUserService: CreateUser;

  beforeAll(() => {
    repository = new UserRepositoryInMemory();
    createUserService = new CreateUser(repository);
  });

  it('Should create an user', async () => {
    const { user } = await createUserService.execute({
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    });
    expect(repository.user[0]).toBe(user);
  });
});
