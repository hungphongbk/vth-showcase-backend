import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { InvestmentPackageEntity } from './investment.package.entity';

export const InvestmentGraphqlOrmModule = NestjsQueryTypeOrmModule.forFeature([
  InvestmentPackageEntity,
]);
