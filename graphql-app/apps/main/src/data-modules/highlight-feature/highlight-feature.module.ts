import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseHFEntity } from './entities/showcaseHF.entity';
import { ShowcaseHFCreateInputDto } from './dtos/showcaseHF.create.dto';
import { ShowcaseHFDto } from './dtos/showcaseHF.dto';
import { ShowcaseHFMediaEntity } from './entities/showcaseHF.media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const showcaseHFOrmModule = NestjsQueryTypeOrmModule.forFeature([
  ShowcaseHFEntity,
]);

@Module({
  imports: [
    TypeOrmModule.forFeature([ShowcaseHFEntity, ShowcaseHFMediaEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [showcaseHFOrmModule],
      resolvers: [
        {
          CreateDTOClass: ShowcaseHFCreateInputDto,
          DTOClass: ShowcaseHFDto,
          EntityClass: ShowcaseHFEntity,
        },
      ],
    }),
    showcaseHFOrmModule,
  ],
  exports: [showcaseHFOrmModule],
})
export class HighlightFeatureModule {}
