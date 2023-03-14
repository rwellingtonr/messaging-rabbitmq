import { User } from '~/domain/users/entities/user.entity';
import { IUserRepository } from '../user/IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  user: User[] = [];

  async create(user: User): Promise<User> {
    this.user.push(user);
    return user;
  }
}
