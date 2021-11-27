// noinspection PointlessArithmeticExpressionJS

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from './ormconfig';
import { join } from 'path';
import { GqlLoggingPlugin } from './common/GqlLoggingPlugin';

import { ConfigModule, ConfigService } from '@nestjs/config';
import firebaseConfig from './config/firebase.config';
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [firebaseConfig],
    }),
    FirebaseAdminModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('firebase'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(connectionOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV === 'development',
      playground: true,
      introspection: true,
    }),
    ModulesModule,
  ],
  providers: [GqlLoggingPlugin],
})
export class AppModule {}
