// noinspection PointlessArithmeticExpressionJS

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ShowcaseModule } from './showcase/showcase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowcaseModel } from './showcase/showcase.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: process.env.DB_PORT
        ? (process.env.DB_PORT as unknown as number) * 1
        : 5432,
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_NAME ?? 'test',
      entities: [ShowcaseModel],
      synchronize: true,
    }),
    GraphQLModule.forRoot({}),
    ShowcaseModule,
  ],
})
export class AppModule {}
