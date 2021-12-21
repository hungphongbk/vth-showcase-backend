import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ShowcaseInvestorStatDto } from '../dtos/showcase.investor-stat.dto';
import { ShowcaseInvestorPackageDto } from '../dtos/showcase-investor-package.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import {
  InvestmentPackageDto,
  InvestmentPackageEntity,
} from '../../investment';

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
}
