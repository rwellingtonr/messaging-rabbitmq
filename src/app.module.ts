import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './domain/users/users.module';
import { GatewayModule } from './infra/gateway/gateway.module';
import { RepositoryModule } from './infra/repository/repositoty.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),

    UsersModule,
    GatewayModule,
    MongooseModule.forRoot(process.env.MONGO_STRING),
    RepositoryModule,
  ],
})
export class AppModule {}
