import { Module } from '@nestjs/common';
import { ShowcaseEntity } from './showcase.entity';
import { ShowcaseResolver } from './showcase.resolver';
import { MediaModule } from '../media/media.module';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseDto } from './showcase.dtos';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ShowcaseEntity])],
      dtos: [{ DTOClass: ShowcaseDto }],
    }),
    MediaModule,
  ],
  providers: [ShowcaseResolver],
})
export class ShowcaseModule {}
