import { InjectRepository } from '@nestjs/typeorm';
import { ShowcaseEntity } from 'apps/main/src/data-modules/showcase/entities/showcase.entity';
import { Repository } from 'typeorm';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import RmqMessages from '@app/configs/rabbitmq-messages';
import {
  SentryTransaction,
  TransactionOperationTypes,
} from '@app/sentry-logger';

@Controller()
export class RemoveCiController {
  constructor(
    @InjectRepository(ShowcaseEntity)
    private readonly repo: Repository<ShowcaseEntity>,
  ) {}

  @MessagePattern(RmqMessages.REMOVE_CI_TEST)
  @SentryTransaction(
    TransactionOperationTypes.MICROSERVICE,
    'RemoveCiShowcases',
  )
  async execute(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    await this.repo
      .createQueryBuilder()
      .delete()
      .where(`slug LIKE 'ci-test%'`)
      .execute();

    channel.ack(originalMessage);
  }
}
