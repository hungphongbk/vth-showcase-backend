import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ShowcaseDto } from '../dtos/showcase.dtos';
import { ShowcaseConnection, ShowcaseQuery } from '../dtos/query.types';
import { ConnectionType } from '@nestjs-query/query-graphql';
import { ShowcaseQueryService } from '../showcase.queryService';
import { UseGuards } from '@nestjs/common';
import { AuthDto, CurrentUser, GqlOptionalAuthGuard } from '../../../auth';
import { ShowcaseInvestorStatDto } from '../dtos/showcase.investor-stat.dto';
import { CacheControlDirective } from '../../../gql/directives/cache-control.directive';

@Resolver(() => ShowcaseDto)
@UseGuards(GqlOptionalAuthGuard)
export class ShowcaseResolver {
  constructor(private readonly service: ShowcaseQueryService) {}

  @Query(() => ShowcaseConnection)
  async showcases(
    @Args() query: ShowcaseQuery,
  ): Promise<ConnectionType<ShowcaseDto>> {
    return ShowcaseConnection.createFromPromise(
      (q) => this.service.query(q),
      query,
    );
  }

  @Query(() => ShowcaseDto)
  async showcase(@Args('slug') slug: string): Promise<ShowcaseDto | undefined> {
    return await this.service.getOneShowcase(slug);
  }

  @CacheControlDirective({ scope: 'PRIVATE' })
  @ResolveField('investorStat', () => ShowcaseInvestorStatDto, {
    nullable: true,
  })
  async investorStat(
    @Parent() parent: ShowcaseDto,
    @CurrentUser() user: AuthDto,
  ) {
    if (!user) return null;
    const stat = new ShowcaseInvestorStatDto(parent);
    if (!stat.canReadThisStat(user)) return null;
    return stat;
  }

  @CacheControlDirective({})
  @Query(() => [String])
  async slugs(): Promise<string[]> {
    return await this.service.slugs();
  }
}
