import { Module } from '@nestjs/common';
import { ShowcaseEntity } from './entities/showcase.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import {
  ShowcaseBaseQueryService,
  ShowcaseProxyQueryService,
  ShowcaseQueryService,
  ShowcaseViewBaseQueryService,
} from './services/showcase-query.service';
import { MediaModule } from '../media/media.module';
import { AuthModule } from '@app/auth';
import { ShowcaseDto } from './dtos/showcase.dto';
import {
  ShowcaseAuthAugmentResolver,
  ShowcaseAuthResolver,
} from './resolvers/showcase-auth.resolver';
import { ShowcaseAssembler } from './showcase.assembler';
import { ShowcaseOrmModule } from './services/showcase-orm.module';
import { InvestmentModule } from '../investment/investment.module';
import { ShowcaseResolver } from './resolvers/showcase.resolver';
import { ShowcaseInvestorStatResolver } from './resolvers/showcase-investor-stat.resolver';
import { ImageListGraphqlModule } from '../image-list/image-list.graphql.module';
import { ShowcaseQueryOrmModule } from './services/showcase-query-orm.module';
import { ShowcaseViewEntity } from './entities/showcase-view.entity';
import { FcmModule } from '@app/fcm';
import { ShowcaseSubscriber } from './subscriber';

const authRelModule = AuthModule.forFeature({
    imports: [ShowcaseQueryOrmModule],
    EntityClass: ShowcaseEntity,
  }),
  authViewRelModule = AuthModule.forFeature({
    imports: [ShowcaseQueryOrmModule],
    EntityClass: ShowcaseViewEntity,
  });

@Module({
  imports: [
    // authRelModule,
    ShowcaseOrmModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        ShowcaseQueryOrmModule,
        authRelModule,
        authViewRelModule,
        MediaModule,
        InvestmentModule,
        ImageListGraphqlModule,
      ],
      services: [
        ShowcaseQueryService,
        ShowcaseBaseQueryService,
        ShowcaseViewBaseQueryService,
        ShowcaseProxyQueryService,
      ],
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
        {
          DTOClass: ShowcaseDto,
          EntityClass: ShowcaseViewEntity,
          ServiceClass: ShowcaseQueryService,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
      ],
    }),
    ShowcaseQueryOrmModule,
    MediaModule,
    FcmModule,
  ],
  providers: [
    ShowcaseResolver,
    ShowcaseAuthResolver,
    ShowcaseAuthAugmentResolver,
    ShowcaseInvestorStatResolver,
    ShowcaseQueryService,
    ShowcaseSubscriber,
  ],
  exports: [ShowcaseOrmModule, ShowcaseQueryService],
})
export class ShowcaseModule {}
