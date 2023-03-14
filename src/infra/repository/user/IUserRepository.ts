import { User } from '~/domain/users/entities/user.entity';

export abstract class IUserRepository {
  abstract create(user: User): Promise<User>;
}
