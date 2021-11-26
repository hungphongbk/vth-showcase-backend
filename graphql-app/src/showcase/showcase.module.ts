import { Module } from '@nestjs/common';
import { ShowcaseEntity } from './entities/showcase.entity';
import { ShowcaseResolver } from './showcase.resolver';
import { MediaModule } from '../media/media.module';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcaseAssembler } from './showcase.assembler';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ShowcaseEntity])],
      assemblers: [ShowcaseAssembler],
      dtos: [{ DTOClass: ShowcaseDto }],
    }),
    MediaModule,
  ],
  providers: [ShowcaseResolver],
})
export class ShowcaseModule {}
