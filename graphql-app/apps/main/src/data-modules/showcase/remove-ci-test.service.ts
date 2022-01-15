import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ShowcaseQueryService } from './query-services/showcase-query.service';

@Injectable()
export class RemoveCiTestService {
  private readonly logger = new Logger(RemoveCiTestService.name);
  constructor(private readonly service: ShowcaseQueryService) {}

  @Cron('0 * * * * *')
  async handleCron() {
    this.logger.log('Cleaning up ci-test which created automatically...');
    const { deletedCount } = await this.service.removeCiTests();
    this.logger.log(`Cleaned ${deletedCount} records`);
  }
}
