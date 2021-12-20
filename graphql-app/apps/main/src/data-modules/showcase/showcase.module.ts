import { Module } from '@nestjs/common';
import { ShowcaseEntity } from './entities/showcase.entity';
import { ShowcaseResolver } from './resolvers/showcase.resolver';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import {
  ShowcaseBaseQueryService,
  ShowcaseQueryService,
} from './showcase.queryService';
import { MediaModule } from '../media/media.module';
import { HighlightFeatureModule } from '../highlight-feature/highlight-feature.module';
import { ImageListModule } from '../image-list/image-list.module';
import { AuthModule } from '../../auth';
import { ShowcaseDto } from './dtos/showcase.dtos';
import {
  ShowcaseAuthAugmentResolver,
  ShowcaseAuthResolver,
} from './resolvers/showcase-auth.resolver';
import { RemoveCiTestService } from './remove-ci-test.service';
import { ShowcaseAssembler } from './showcase.assembler';
import { ShowcaseOrmModule } from './showcase-orm.module';

const showcaseQueryOrmModule = NestjsQueryTypeOrmModule.forFeature([
    ShowcaseEntity,
  ]),
  authRelModule = AuthModule.forFeature({
    imports: [showcaseQueryOrmModule],
    EntityClass: ShowcaseEntity,
  });

@Module({
  imports: [
    // authRelModule,
    ShowcaseOrmModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        showcaseQueryOrmModule,
        authRelModule,
        MediaModule,
        HighlightFeatureModule,
        ImageListModule,
      ],
      services: [ShowcaseQueryService, ShowcaseBaseQueryService],
      assemblers: [ShowcaseAssembler],
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
    showcaseQueryOrmModule,
    MediaModule,
    HighlightFeatureModule,
    ImageListModule,
  ],
  providers: [
    ShowcaseResolver,
    ShowcaseAuthResolver,
    ShowcaseAuthAugmentResolver,
    ShowcaseQueryService,
    RemoveCiTestService,
  ],
  exports: [ShowcaseQueryService],
})
export class ShowcaseModule {}
