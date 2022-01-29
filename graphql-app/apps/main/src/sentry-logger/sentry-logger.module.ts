import { Module } from '@nestjs/common';
import { SentryLoggerService } from './sentry-logger.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SENTRY_DSN: Joi.string().required(),
        APP_ENV: Joi.string().optional(),
      }),
    }),
  ],
  providers: [SentryLoggerService],
  exports: [SentryLoggerService],
})
export class SentryLoggerModule {}
