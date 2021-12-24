import { Module } from '@nestjs/common';
import { SentryLoggerService } from './sentry-logger.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SENTRY_DSN: Joi.string().required(),
      }),
    }),
  ],
  providers: [SentryLoggerService],
  exports: [SentryLoggerService],
})
export class SentryLoggerModule {}
