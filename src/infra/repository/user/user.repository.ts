import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserProps } from '~/domain/users/entities/user.entity';
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

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email,
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByExternalId(extId: number): Promise<User> {
    const user = await this.userModel.findOne({
      external_id: extId,
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async removeAvatar(extId: number): Promise<void> {
    await this.userModel.updateOne({ external_id: extId }, { avatar: '' });
  }

  async updateUser(extId: number, user: User): Promise<void> {
    const updateUser = UserMapper.toInfra(user);
    await this.userModel.updateOne({ external_id: extId }, updateUser);
  }
}
