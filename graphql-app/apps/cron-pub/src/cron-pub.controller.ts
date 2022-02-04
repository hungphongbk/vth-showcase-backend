import { Controller, Get } from '@nestjs/common';
import { CronPubService } from './cron-pub.service';

@Controller()
export class CronPubController {
  constructor(private readonly cronPubService: CronPubService) {}

  @Get()
  getHello(): string {
    return this.cronPubService.getHello();
  }
}
