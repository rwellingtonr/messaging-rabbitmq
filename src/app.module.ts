import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './domain/users/users.module';
import { GatewayModule } from './infra/gateway/gateway.module';
import { RepositoryModule } from './infra/repository/repositoty.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    GatewayModule,
    MongooseModule.forRoot(process.env.MONGO_STRING),
    RepositoryModule,
  ],
})
export class AppModule {}
