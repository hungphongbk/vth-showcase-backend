import { Args, Resolver } from '@nestjs/graphql';
import { PreorderDto } from './dtos/preorder.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { PreorderEntity } from './entities/preorder.entity';
import { UseGuards } from '@nestjs/common';
import { AuthDto, CurrentUser, GqlAuthGuard } from '../../auth';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { ShowcaseQueryService } from '../showcase/showcase.queryService';

@Resolver(() => PreorderDto)
export class PreorderResolver {
  constructor(
    @InjectQueryService(PreorderEntity)
    private readonly service: QueryService<PreorderDto>,
    private readonly showcaseService: ShowcaseQueryService,
  ) {
    //
  }

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => PreorderDto)
  async createOnePreorder(
    @Args('slug') slug: string,
    @CurrentUser() user: AuthDto,
  ) {
    let preorder = await this.service.createOne({ authorUid: user.uid });
    const showcase = await this.showcaseService.getOneShowcase(slug);
    preorder = await this.service.setRelation(
      'showcase',
      preorder.id,
      showcase.id,
    );
    return preorder;
  }
}
