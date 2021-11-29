import { Module } from '@nestjs/common';
import { ShowcaseEntity } from './entities/showcase.entity';
import { ShowcaseResolver } from './showcase.resolver';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseQueryService } from './showcase.queryService';
import { MediaModule } from '../media/media.module';
import { HighlightFeatureModule } from '../highlight-feature/highlight-feature.module';
import { ImageListModule } from '../image-list/image-list.module';
import { ShowcaseDto } from './dtos/showcase.dtos';

const showcaseOrmModule = NestjsQueryTypeOrmModule.forFeature([ShowcaseEntity]);

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [showcaseOrmModule],
      resolvers: [
        {
          DTOClass: ShowcaseDto,
          EntityClass: ShowcaseEntity,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { one: { disabled: true } },
        },
      ],
    }),
    showcaseOrmModule,
    MediaModule,
    HighlightFeatureModule,
    ImageListModule,
  ],
  providers: [ShowcaseResolver, ShowcaseQueryService],
})
export class ShowcaseModule {}
