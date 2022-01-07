import { Module } from '@nestjs/common';
import { ShowcaseEntity } from './entities/showcase.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import {
  ShowcaseBaseQueryService,
  ShowcaseQueryService,
} from './showcase.queryService';
import { MediaModule } from '../media/media.module';
import { AuthModule } from '../../auth';
import { ShowcaseDto } from './dtos/showcase.dto';
import {
  ShowcaseAuthAugmentResolver,
  ShowcaseAuthResolver,
} from './resolvers/showcase-auth.resolver';
import { RemoveCiTestService } from './remove-ci-test.service';
import { ShowcaseAssembler } from './showcase.assembler';
import { ShowcaseOrmModule } from './showcase-orm.module';
import { InvestmentModule } from '../investment';
import { ShowcaseResolver } from './resolvers/showcase.resolver';
import { ShowcaseInvestorStatResolver } from './resolvers/showcase-investor-stat.resolver';
import { ImageListGraphqlModule } from '../image-list/image-list.graphql.module';

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
        InvestmentModule,
        ImageListGraphqlModule,
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
  ],
  providers: [
    ShowcaseResolver,
    ShowcaseAuthResolver,
    ShowcaseAuthAugmentResolver,
    ShowcaseInvestorStatResolver,
    ShowcaseQueryService,
    RemoveCiTestService,
  ],
  exports: [ShowcaseQueryService],
})
export class ShowcaseModule {}
