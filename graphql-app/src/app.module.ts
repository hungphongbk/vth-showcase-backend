// noinspection PointlessArithmeticExpressionJS

import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from './ormconfig';
import { GqlLoggingPlugin } from './common/GqlLoggingPlugin';
import firebaseConfig from './config/firebase.config';
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin';
import { DataModulesModule } from './data-modules/data-modules.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import * as redisStore from 'cache-manager-redis-store';
import * as Joi from '@hapi/joi';
import { GqlModule } from './gql/gql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
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
    FirebaseAdminModule.forRootAsync({
      useFactory: firebaseConfig,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    GqlModule,
    DataModulesModule,
    HealthModule,
  ],
  providers: [
    GqlLoggingPlugin,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
