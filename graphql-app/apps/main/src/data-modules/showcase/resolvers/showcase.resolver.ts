import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ShowcaseDto } from '../dtos/showcase.dtos';
import { ShowcaseConnection, ShowcaseQuery } from '../dtos/query.types';
import { ConnectionType } from '@nestjs-query/query-graphql';
import { ShowcaseQueryService } from '../showcase.queryService';
import { UseGuards } from '@nestjs/common';
import {
  AuthDto,
  AuthRoleType,
  CurrentUser,
  GqlOptionalAuthGuard,
} from '../../../auth';
import { ShowcaseInvestorStatDto } from '../dtos/showcase.investor-stat.dto';
import * as deepmerge from 'deepmerge';
import { ForbiddenError } from 'apollo-server-express';

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
      deepmerge(query, {
        filter: { slug: { notLike: 'ci-test%' } },
      } as ShowcaseQuery),
    );
  }

  /**
   * Chỉ trả về showcase khi
   * 1/ showcase được published
   * 2/ showcase status và requested bởi author, hoặc superadmin
   *
   */
  @Query(() => ShowcaseDto)
  async showcase(
    @Args('slug') slug: string,
    @CurrentUser() user: AuthDto,
  ): Promise<ShowcaseDto | undefined> {
    const showcase = await this.service.getOneShowcase(slug);
    if (showcase.isPublished) return showcase;
    if (
      user.role === AuthRoleType.ADMIN ||
      user.role === AuthRoleType.SUPERADMIN
    )
      return showcase;
    if (showcase.isCreatedBy(user)) return showcase;
    throw new ForbiddenError('Bạn không có quyền truy cập vào Showcase này');
  }

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

  @Query(() => [String])
  async slugs(): Promise<string[]> {
    return await this.service.slugs();
  }
}
