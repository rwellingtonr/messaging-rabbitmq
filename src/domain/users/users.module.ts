import { Module } from '@nestjs/common';
import { GatewayModule } from '~/infra/gateway/gateway.module';
import { RepositoryModule } from '~/infra/repository/repositoty.module';
import { CreateUser } from './use-cases/create.user';
import { GetUserById } from './use-cases/getUserById';

import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [GatewayModule, RepositoryModule],
  providers: [CreateUser, GetUserById],
})
export class UsersModule {}
