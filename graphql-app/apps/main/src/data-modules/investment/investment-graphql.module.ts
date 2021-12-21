import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { InvestmentPackageDto } from './investment.package.dto';
import { InvestmentPackageEntity } from './investment.package.entity';
import { InvestmentGraphqlOrmModule } from './investment-graphql-orm.module';

export const InvestmentGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [InvestmentGraphqlOrmModule],
  resolvers: [
    {
      DTOClass: InvestmentPackageDto,
      EntityClass: InvestmentPackageEntity,
    },
  ],
});
