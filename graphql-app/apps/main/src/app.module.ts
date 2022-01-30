// noinspection PointlessArithmeticExpressionJS

import { CacheModule, Module } from '@nestjs/common';
import { DataModulesModule } from './data-modules/data-modules.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import * as redisStore from 'cache-manager-redis-store';
import * as Joi from 'joi';
import { GqlModule } from './gql/gql.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadModule } from '@app/upload';
import { SeederModule } from './seeder/seeder.module';
import { SentryLoggerModule } from './sentry-logger/sentry-logger.module';
import { FirebaseModule } from '@app/firebase';
import { MailerModule } from '@app/mailer';
import { InvestorModule } from '@app/investor';
import { FcmModule } from '@app/fcm';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        // ...
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 120,
      }),
    }),
    FirebaseModule,
    MailerModule,
    ScheduleModule.forRoot(),
    GqlModule,
    DataModulesModule,
    HealthModule,
    UploadModule,
    SeederModule,
    SentryLoggerModule,
    InvestorModule,
    FcmModule,
  ],
})
export class AppModule {}
