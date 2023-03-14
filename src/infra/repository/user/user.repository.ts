import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '~/domain/users/entities/user.entity';
import {
  type UserDocument,
  User as UserSchema,
} from '~/infra/schemas/user.schema';
import { UserMapper } from '../mapper/user.mapper';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const createUser = UserMapper.toInfra(user);
    const userModel = new this.userModel(createUser);
    const createdUser = await userModel.save();
    return UserMapper.toDomain(createdUser);
  }
}
