import {
  Args,
  InputType,
  Parent,
  PickType,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ShowcaseInvestorStatDto } from '../dtos/showcase.investor-stat.dto';
import { ShowcaseInvestorPackageDto } from '../dtos/showcase-investor-package.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ShowcaseDto } from '../dtos/showcase.dto';
import { InvestmentPackageEntity } from '../../investment/investment.package.entity';
import { InvestmentPackageDto } from '../../investment/investment.package.dto';

@InputType()
class ShowcaseForCalculateDto extends PickType(
  ShowcaseDto,
  [
    'expectedQuantity',
    'expectedSalePrice',
    'expectedSaleAt',
    'expectedSaleEndAt',
    'inventory',
  ],
  InputType,
) {}

@Resolver(() => ShowcaseInvestorStatDto)
export class ShowcaseInvestorStatResolver {
  constructor(
    @InjectQueryService(InvestmentPackageEntity)
    private packageService: QueryService<InvestmentPackageDto>,
  ) {}
  @ResolveField('packages', () => [ShowcaseInvestorPackageDto])
  async packages(@Parent() parent: ShowcaseInvestorStatDto) {
    const packages = await this.packageService.query({});
    return packages.map((pkg) => new ShowcaseInvestorPackageDto(parent, pkg));
  }

  @Query(() => ShowcaseInvestorStatDto)
  calculateInventoryStat(@Args('showcase') showcase: ShowcaseForCalculateDto) {
    return new ShowcaseInvestorStatDto(showcase as unknown as ShowcaseDto);
  }
}
