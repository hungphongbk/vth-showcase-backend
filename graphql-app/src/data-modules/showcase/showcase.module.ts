import { Module } from '@nestjs/common';
import { ShowcaseEntity } from './entities/showcase.entity';
import { ShowcaseResolver } from './resolvers/showcase.resolver';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseQueryService } from './showcase.queryService';
import { MediaModule } from '../media/media.module';
import { HighlightFeatureModule } from '../highlight-feature/highlight-feature.module';
import { ImageListModule } from '../image-list/image-list.module';
import { AuthModule } from '../../auth';
import { ShowcaseDto } from './dtos/showcase.dtos';
import {
  ShowcaseAuthAugmentResolver,
  ShowcaseAuthResolver,
} from './resolvers/showcase-auth.resolver';

const showcaseOrmModule = NestjsQueryTypeOrmModule.forFeature([ShowcaseEntity]),
  authRelModule = AuthModule.forFeature({
    imports: [showcaseOrmModule],
    EntityClass: ShowcaseEntity,
  });

@Module({
  imports: [
    // authRelModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        showcaseOrmModule,
        authRelModule,
        MediaModule,
        HighlightFeatureModule,
        ImageListModule,
      ],
      services: [ShowcaseQueryService],
      resolvers: [
        {
          DTOClass: ShowcaseDto,
          EntityClass: ShowcaseEntity,
          ServiceClass: ShowcaseQueryService,
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
  providers: [
    ShowcaseResolver,
    ShowcaseAuthResolver,
    ShowcaseAuthAugmentResolver,
    ShowcaseQueryService,
  ],
  exports: [ShowcaseQueryService],
})
export class ShowcaseModule {}
