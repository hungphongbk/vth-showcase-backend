import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { InvestmentPackageDto } from '../../investment';
import { ShowcaseInvestorStatDto } from './showcase.investor-stat.dto';

@ObjectType()
export class ShowcaseInvestorPackageDto {
  constructor(
    private readonly inventoryStat: ShowcaseInvestorStatDto,
    private readonly invPackage: InvestmentPackageDto,
  ) {}

  @Field(() => InvestmentPackageDto)
  get package() {
    return this.invPackage;
  }

  @Directive('@currency')
  @Field(() => String)
  get fund() {
    return (
      (this.invPackage.fundedRate / 100.0) *
      this.inventoryStat.capitalizationCost
    );
  }

  @Directive('@currency')
  @Field(() => String)
  get firstYearBenefit() {
    return (
      (this.invPackage.benefitRate / 100.0) *
      this.inventoryStat.firstYearRevenue
    );
  }
}
