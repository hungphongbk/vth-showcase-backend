// noinspection PointlessArithmeticExpressionJS

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from './ormconfig';
import { join } from 'path';
import { GqlLoggingPlugin } from './common/GqlLoggingPlugin';
import firebaseConfig from './config/firebase.config';
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin';
import { AuthModule } from './auth/auth.module';
import { DataModulesModule } from './data-modules/data-modules.module';

@Module({
  imports: [
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
    }),
    DataModulesModule,
    AuthModule,
  ],
  providers: [GqlLoggingPlugin],
})
export class AppModule {}
