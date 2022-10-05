import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmResolver } from '@app/fcm/fcm.resolver';
import { FcmController } from '@app/fcm/fcm.controller';
import { RabbitmqClientModule } from '@app/rabbitmq-client';

@Module({
  imports: [RabbitmqClientModule],
  providers: [FcmService, FcmResolver],
  controllers: [FcmController],
  exports: [FcmService],
})
export class FcmModule {}
