import { Email } from '~/domain/users/entities/email.entity';
import { User } from '~/domain/users/entities/user.entity';
import { Username } from '~/domain/users/entities/userName.entity';
import { User as UserSchema } from '~/infra/schemas/user.schema';

export class UserMapper {
  static toDomain(user: UserSchema): User {
    return new User({
      email: new Email(user.email),
      first_name: new Username(user.first_name),
      last_name: new Username(user.last_name),
      avatar: user.avatar,
      created_at: user.created_at,
      external_id: user.external_id,
    });
  }

  static toInfra(user: Partial<User>): UserSchema {
    const userSchema: UserSchema = {
      first_name: user.firstName.value,
      last_name: user.lastName.value,
      email: user.email.value,
      avatar: user.avatar,
      created_at: user.createdAt,
      external_id: user.externalId,
    };
    return userSchema;
  }
}
