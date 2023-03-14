import { User, UserProps } from '~/domain/users/entities/user.entity';
import { IUserRepository } from '../user/IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  user: User[] = [];

  async create(user: User): Promise<User> {
    this.user.push(user);
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    return this.user.find((user) => user.email.value === email);
  }
  async findByExternalId(extId: number): Promise<User> {
    return this.user.find((user) => user.externalId === extId);
  }
  async removeAvatar(extId: number): Promise<void> {
    const user = this.user.find((user) => user.externalId === extId);
    user.avatar = '';
  }

  async updateUser(extId: number, user: User): Promise<void> {
    return;
  }
}
