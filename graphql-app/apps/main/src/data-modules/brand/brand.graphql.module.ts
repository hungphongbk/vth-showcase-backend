import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { BrandGraphqlOrmModule } from './brand.graphql-orm.module';
import { BrandDto } from './brand.dto';
import { BrandEntity } from './brand.entity';

export const BrandGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [BrandGraphqlOrmModule],
  resolvers: [{ DTOClass: BrandDto, EntityClass: BrandEntity }],
});
