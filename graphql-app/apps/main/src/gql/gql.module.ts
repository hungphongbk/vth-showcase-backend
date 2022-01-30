import { GqlService } from './gql.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SentryLoggerModule } from '../sentry-logger/sentry-logger.module';
import { Module } from '@nestjs/common';
import { GqlSentryLoggingPlugin } from './plugins/sentry-log';
import { GqlSentryTransactionPlugin } from './plugins/sentry-transaction';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [
        SentryLoggerModule,
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            GQL_INTROSPECTION: Joi.boolean().required(),
          }),
        }),
      ],
      useClass: GqlService,
    }),
    SentryLoggerModule,
  ],
  providers: [GqlSentryLoggingPlugin, GqlSentryTransactionPlugin],
})
export class GqlModule {}
