import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../schemas/user.schema';
import { IUserRepository } from './user/IUserRepository';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      useClass: UserRepository,
      provide: IUserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class RepositoryModule {}
