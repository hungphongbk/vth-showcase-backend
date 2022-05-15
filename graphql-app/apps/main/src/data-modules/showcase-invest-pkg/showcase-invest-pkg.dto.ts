import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { InvestmentPackageDto } from '../investment/investment.package.dto';

@ObjectType()
@Relation('pkg', () => InvestmentPackageDto, {
  disableUpdate: true,
  disableRemove: true,
})
export class ShowcaseInvestPkgDto {
  @FilterableField({ filterOnly: true })
  showcaseId: number;
  @Field()
  fundedRate: number;

  @Field()
  count: number;

  @Field()
  benefitRate: number;
}
