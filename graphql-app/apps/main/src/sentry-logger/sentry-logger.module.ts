import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SentryModule } from '@ntegral/nestjs-sentry';

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
          release: '1.0',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class SentryLoggerModule {}
