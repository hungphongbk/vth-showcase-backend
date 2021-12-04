import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { InvestmentPackageEntity } from './investment.package.entity';
import { InvestmentPackageDto } from './investment.package.dto';

const ormModule = NestjsQueryTypeOrmModule.forFeature([
  InvestmentPackageEntity,
]);

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [ormModule],
      resolvers: [
        {
          DTOClass: InvestmentPackageDto,
          EntityClass: InvestmentPackageEntity,
        },
      ],
    }),
    ormModule,
  ],
  exports: [ormModule],
})
export class InvestmentModule {}
