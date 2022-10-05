import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowcaseInvestPkgEntity } from './showcase-invest-pkg.entity';
import { ShowcaseInvestPkgGraphqlOrmModule } from './graphql-orm.module';
import { ShowcaseInvestPkgGraphqlModule } from './graphql.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShowcaseInvestPkgEntity]),
    ShowcaseInvestPkgGraphqlOrmModule,
    ShowcaseInvestPkgGraphqlModule,
  ],
})
export class ShowcaseInvestPkgModule {}
