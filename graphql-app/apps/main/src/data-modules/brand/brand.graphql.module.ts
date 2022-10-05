import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { BrandGraphqlOrmModule } from './brand.graphql-orm.module';
import {
  BrandCreateInputDto,
  BrandDto,
  BrandUpdateInputDto,
} from './brand.dto';
import { BrandEntity } from './brand.entity';

export const BrandGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [BrandGraphqlOrmModule],
  resolvers: [
    {
      DTOClass: BrandDto,
      EntityClass: BrandEntity,
      CreateDTOClass: BrandCreateInputDto,
      UpdateDTOClass: BrandUpdateInputDto,
    },
  ],
});
