import { Module } from '@nestjs/common';
import { CronPubController } from './cron-pub.controller';
import { CronPubService } from './cron-pub.service';

@Module({
  imports: [],
  controllers: [CronPubController],
  providers: [CronPubService],
})
export class CronPubModule {}
