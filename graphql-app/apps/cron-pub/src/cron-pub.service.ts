import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VthConfigsService } from '@app/configs';
import { RabbitmqClientService } from '@app/rabbitmq-client';
import RmqMessages from '@app/configs/rabbitmq-messages';

@Injectable()
export class CronPubService {
  constructor(
    private readonly config: VthConfigsService,
    private readonly client: RabbitmqClientService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async removeCiTest() {
    await this.client.send(RmqMessages.REMOVE_CI_TEST, { message: '' });
  }
}
