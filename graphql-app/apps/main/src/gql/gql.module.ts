import { GqlService } from './gql.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { GqlSentryLoggingPlugin } from './plugins/sentry-log';
import { GqlSentryTransactionPlugin } from './plugins/sentry-transaction';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            GQL_INTROSPECTION: Joi.boolean().required(),
          }),
        }),
      ],
      useClass: GqlService,
    }),
  ],
  providers: [GqlSentryLoggingPlugin, GqlSentryTransactionPlugin],
})
export class GqlModule {}
