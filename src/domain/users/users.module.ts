import { Module } from '@nestjs/common';
import { GatewayModule } from '~/infra/gateway/gateway.module';
import { RepositoryModule } from '~/infra/repository/repositoty.module';

import { CreateUser } from './use-cases/create.user';
import { GetUserById } from './use-cases/getUserById';

import { UsersController } from './users.controller';
import { BullModule } from '@nestjs/bull';
import { sendMailConsumer } from './jobs/send-email-consumer';

@Module({
  controllers: [UsersController],
  imports: [
    GatewayModule,
    RepositoryModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  providers: [CreateUser, GetUserById, sendMailConsumer],
})
export class UsersModule {}
