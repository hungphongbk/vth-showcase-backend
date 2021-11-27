import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseHFEntity } from './entities/showcaseHF.entity';
import { ShowcaseHFCreateInputDto } from './dtos/showcaseHF.create.dto';
import { ShowcaseHFDto } from './dtos/showcaseHF.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ShowcaseHFEntity])],
      resolvers: [
        {
          CreateDTOClass: ShowcaseHFCreateInputDto,
          DTOClass: ShowcaseHFDto,
          EntityClass: ShowcaseHFEntity,
        },
      ],
    }),
  ],
})
export class HighlightFeatureModule {}
