import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { BrandOrmModule } from './brand.orm.module';
import { BrandGraphqlOrmModule } from './brand.graphql-orm.module';
import { BrandDto } from './brand.dto';
import { BrandEntity } from './brand.entity';

export const BrandGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [BrandOrmModule, BrandGraphqlOrmModule],
  resolvers: [{ DTOClass: BrandDto, EntityClass: BrandEntity }],
});
