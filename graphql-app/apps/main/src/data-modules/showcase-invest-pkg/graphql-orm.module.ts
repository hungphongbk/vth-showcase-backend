import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseInvestPkgEntity } from './showcase-invest-pkg.entity';

export const ShowcaseInvestPkgGraphqlOrmModule =
  NestjsQueryTypeOrmModule.forFeature([ShowcaseInvestPkgEntity]);
