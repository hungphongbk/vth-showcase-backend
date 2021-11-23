// noinspection PointlessArithmeticExpressionJS

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ShowcaseModule } from './showcase/showcase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './media/media.module';
import * as connectionOptions from './ormconfig';
import { join } from 'path';
import { GqlLoggingPlugin } from './common/GqlLoggingPlugin';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV === 'development',
      playground: true,
      introspection: true,
    }),
    ShowcaseModule,
    MediaModule,
  ],
  providers: [GqlLoggingPlugin],
})
export class AppModule {}
