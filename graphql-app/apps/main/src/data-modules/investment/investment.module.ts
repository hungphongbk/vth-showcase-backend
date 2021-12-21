import { Module } from '@nestjs/common';
import { InvestmentPackageEntity } from './investment.package.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentGraphqlOrmModule } from './investment-graphql-orm.module';
import { InvestmentGraphqlModule } from './investment-graphql.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvestmentPackageEntity]),
    InvestmentGraphqlModule,
    InvestmentGraphqlOrmModule,
  ],
  exports: [InvestmentGraphqlOrmModule],
})
export class InvestmentModule {}
