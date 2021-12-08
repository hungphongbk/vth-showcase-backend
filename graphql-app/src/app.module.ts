// noinspection PointlessArithmeticExpressionJS

import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from './ormconfig';
import { join } from 'path';
import { GqlLoggingPlugin } from './common/GqlLoggingPlugin';
import firebaseConfig from './config/firebase.config';
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin';
import { AuthModule } from './auth/auth.module';
import { DataModulesModule } from './data-modules/data-modules.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import * as Joi from '@hapi/joi';

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
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV === 'development',
      playground: true,
      introspection: true,
      // typeDefs: [JSONObjectDefinition],
      // resolvers: { JSONObjectResolver },
    }),
    DataModulesModule,
    AuthModule,
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
