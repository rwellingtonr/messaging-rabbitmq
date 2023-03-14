import { Module } from '@nestjs/common';
import { GatewayModule } from '~/infra/gateway/gateway.module';
import { RepositoryModule } from '~/infra/repository/repositoty.module';

import { CreateUser } from './use-cases/create.user';
import { GetUserById } from './use-cases/getUserById';

import { UsersController } from './users.controller';
import { BullModule } from '@nestjs/bull';
import { sendMailConsumer } from './jobs/send-email-consumer';
import { GetImageByUserId } from './use-cases/getImageByUserId';
import { RemoveAvatar } from './use-cases/remove.avatar';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UsersController],
  imports: [
    GatewayModule,
    RepositoryModule,
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
    ClientsModule.register([
      {
        name: 'MESSAGE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ottfggxd:ghpAsKbWQGQ7teGNiqRTw8QMDOAbSHXg@jackal.rmq.cloudamqp.com/ottfggxd',
          ],
          queue: 'send_event',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    CreateUser,
    GetUserById,
    RemoveAvatar,
    GetImageByUserId,
    sendMailConsumer,
  ],
})
export class UsersModule {}
