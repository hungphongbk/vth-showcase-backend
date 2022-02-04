import { Module } from '@nestjs/common';
import { CronPubService } from './cron-pub.service';
import { RabbitmqClientModule } from '@app/rabbitmq-client';
import { ScheduleModule } from '@nestjs/schedule';
import { VthConfigsModule } from '@app/configs';

@Module({
  imports: [RabbitmqClientModule, ScheduleModule.forRoot(), VthConfigsModule],
  providers: [CronPubService],
})
export class CronPubModule {}
