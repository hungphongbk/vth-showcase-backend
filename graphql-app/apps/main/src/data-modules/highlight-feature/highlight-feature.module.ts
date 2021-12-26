import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseHFEntity } from './entities/showcaseHF.entity';
import { ShowcaseHFCreateInputDto } from './dtos/showcaseHF.create.dto';
import { ShowcaseHFDto } from './dtos/showcaseHF.dto';
import { ShowcaseHFMediaEntity } from './entities/showcaseHF.media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighlightFeatureResolver } from './highlight-feature.resolver';
import { ShowcaseModule } from '../showcase/showcase.module';
import { MediaModule } from '../media/media.module';

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
          UpdateDTOClass: ShowcaseHFCreateInputDto,
          DTOClass: ShowcaseHFDto,
          EntityClass: ShowcaseHFEntity,
          read: { many: { disabled: true } },
          create: { one: { disabled: true }, many: { disabled: true } },
          update: { one: { disabled: true }, many: { disabled: true } },
          delete: { many: { disabled: true } },
        },
      ],
    }),
    showcaseHFOrmModule,
    ShowcaseModule,
    MediaModule,
  ],
  providers: [HighlightFeatureResolver],
  exports: [showcaseHFOrmModule],
})
export class HighlightFeatureModule {}
