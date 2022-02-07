import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { Transaction } from '@sentry/integrations';
import * as Tracing from '@sentry/tracing';
import { Integrations } from '@sentry/node';

@Global()
@Module({
  imports: [
    SentryModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            SENTRY_DSN: Joi.string().required(),
            APP_ENV: Joi.string().optional(),
          }),
        }),
      ],
      useFactory: async (config: ConfigService) => {
        return {
          dsn: config.get('SENTRY_DSN'),
          debug: config.get('APP_ENV') !== 'production',
          environment: config.get('APP_ENV'),
          enabled: config.get('APP_ENV') !== 'localhost',
          release: '1.0.1',
          tracesSampleRate: 1.0,
          integrations: [
            new Integrations.Http({ tracing: true }),
            // new RewriteFrames({
            //   root: global.__rootdir__,
            // }),
            new Transaction(),
            new Tracing.Integrations.Postgres(),
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class SentryLoggerModule {}
