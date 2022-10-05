import { Controller, Logger } from '@nestjs/common';
import { GaDataService } from '@app/ga-data';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import RmqMessages from '@app/configs/rabbitmq-messages';
import {
  SentryTransaction,
  TransactionOperationTypes,
} from '@app/sentry-logger';
import { google } from '@google-analytics/data/build/protos/protos';
import { RabbitmqClientService } from '@app/rabbitmq-client';
import { chunk } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowcaseEntity } from '../../data-modules/showcase/entities/showcase.entity';
import { Repository } from 'typeorm';
import MetricAggregation = google.analytics.data.v1beta.MetricAggregation;

@Controller()
export class UpdateShowcaseViewsController {
  private readonly logger = new Logger(this.constructor.name, {
    timestamp: true,
  });
  private readonly _regex = /(preview|post)\/([0-9a-zA-Z\-]+)/g;

  constructor(
    private readonly gaClient: GaDataService,
    @InjectRepository(ShowcaseEntity)
    private readonly repo: Repository<ShowcaseEntity>,
    private readonly rmqClient: RabbitmqClientService,
  ) {}

  @MessagePattern(RmqMessages.UPDATE_SHOWCASE_VIEW)
  @SentryTransaction(
    TransactionOperationTypes.MICROSERVICE,
    'UpdateShowcaseViews',
  )
  public async execute(@Ctx() context: RmqContext) {
    this.logger.log('Start calculate showcase views...');
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    const payload = await this.transformReport();
    await Promise.all(
      chunk(Object.entries(payload), 5).map((batch) =>
        this.rmqClient.send(RmqMessages.UPDATE_SHOWCASE_VIEW_BATCH, batch),
      ),
    );

    channel.ack(originalMessage);
    this.logger.log('finished');
  }

  @MessagePattern(RmqMessages.UPDATE_SHOWCASE_VIEW_BATCH)
  @SentryTransaction(
    TransactionOperationTypes.MICROSERVICE,
    'UpdateShowcaseViewsBatch',
  )
  public async batchUpdate(
    @Ctx() context: RmqContext,
    @Payload() data: [string, number][],
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    await Promise.all(
      data.map(([slug, viewCount]) => this.storeOne(slug, viewCount)),
    );

    channel.ack(originalMessage);
  }

  private async storeOne(slug: string, viewCount: number) {
    await this.repo
      .createQueryBuilder()
      .update()
      .set({ viewCount })
      .where('slug = :slug', { slug })
      .execute();
  }

  private async transformReport() {
    const [response] = await this.runReport();
    return response.rows
      .map((row) => {
        const url = row.dimensionValues[0].value,
          // noinspection PointlessArithmeticExpressionJS
          count = (row.metricValues[0].value as unknown as number) * 1;
        return { url, count };
      })
      .reduce((acc, val) => {
        const slugMatch = this._regex.exec(val.url)?.[2];
        if (typeof slugMatch === 'string') {
          if (!acc[slugMatch]) {
            acc[slugMatch] = val.count;
          } else acc[slugMatch] += val.count;
        }
        return acc;
      }, {} as Record<string, number>);
  }

  private runReport() {
    return this.gaClient.runReport({
      dimensions: [{ name: 'fullPageUrl' }],
      metrics: [{ name: 'screenPageViews' }],
      dateRanges: [{ startDate: '90daysAgo', endDate: 'yesterday' }],
      dimensionFilter: {
        filter: {
          fieldName: 'fullPageUrl',
          stringFilter: {
            matchType: 'PARTIAL_REGEXP',
            value: 'showcase-dev\\.vaithuhay\\.com\\/(preview|post)\\/',
          },
        },
      },
      metricAggregations: [MetricAggregation.TOTAL],
    });
  }
}
