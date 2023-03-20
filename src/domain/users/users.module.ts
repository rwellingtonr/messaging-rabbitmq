import { Module } from '@nestjs/common';
import { GatewayModule } from '~/infra/gateway/gateway.module';
import { RepositoryModule } from '~/infra/repository/repositoty.module';
import { CreateUser } from './use-cases/create.user';
import { GetUserById } from './use-cases/getUserById';
import { UsersController } from './users.controller';

import { GetImageByUserId } from './use-cases/getImageByUserId';
import { RemoveAvatar } from './use-cases/remove.avatar';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { SendEmail } from './use-cases/sendEmail';

@Module({
  controllers: [UsersController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GatewayModule,
    RepositoryModule,
    ClientsModule.register([
      {
        name: 'MESSAGE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_CONNECTION],
          queue: 'test',
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
    SendEmail,
  ],
})
export class UsersModule {}
