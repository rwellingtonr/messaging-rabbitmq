import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Module({
  imports: [HttpModule],
  providers: [GatewayService],
  exports: [GatewayService],
})
export class GatewayModule {}
