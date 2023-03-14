import { User } from '~/domain/users/entities/user.entity';

export abstract class IUserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByExternalId(extId: number): Promise<User>;
  abstract removeAvatar(extId: number): Promise<void>;
  abstract updateUser(extId: number, user: User): Promise<void>;
}
