import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { ShowcaseInvestPkgGraphqlOrmModule } from './graphql-orm.module';
import { ShowcaseInvestPkgDto } from './showcase-invest-pkg.dto';
import { ShowcaseInvestPkgEntity } from './showcase-invest-pkg.entity';

export const ShowcaseInvestPkgGraphqlModule =
  NestjsQueryGraphQLModule.forFeature({
    imports: [ShowcaseInvestPkgGraphqlOrmModule],
    resolvers: [
      { DTOClass: ShowcaseInvestPkgDto, EntityClass: ShowcaseInvestPkgEntity },
    ],
  });
