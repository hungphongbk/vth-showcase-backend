// noinspection PointlessArithmeticExpressionJS

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ShowcaseModule } from './showcase/showcase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './media/media.module';
import * as connectionOptions from './ormconfig';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV === 'development',
      playground: true,
    }),
    ShowcaseModule,
    MediaModule,
  ],
})
export class AppModule {}
