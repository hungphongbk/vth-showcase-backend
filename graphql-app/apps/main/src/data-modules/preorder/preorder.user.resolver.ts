import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthDto, CurrentUser, GqlOptionalAuthGuard } from '@app/auth';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { PreorderEntity } from './entities/preorder.entity';
import { PreorderDto } from './dtos/preorder.dto';
import { UseGuards } from '@nestjs/common';
import { ShowcaseDto } from '../showcase/dtos/showcase.dto';

@Resolver(() => ShowcaseDto)
export class PreorderUserResolver {
  constructor(
    @InjectQueryService(PreorderEntity)
    private readonly service: QueryService<PreorderDto>,
  ) {
    //
  }

  @UseGuards(GqlOptionalAuthGuard)
  @ResolveField('isPreordered', () => Boolean, {
    nullable: true,
    description:
      'Trả về người dùng hiện tại đã preorder sản phẩm này chưa. Nếu chưa đăng nhập, luôn trả về false',
  })
  async isPreordered(
    @CurrentUser() user: AuthDto,
    @Parent() showcase: ShowcaseDto,
  ) {
    const uid = user?.uid;
    if (!uid) return false;

    const preorder = (
      await this.service.query({
        filter: { authorUid: { eq: uid }, showcaseId: { eq: showcase.id } },
      })
    )[0];

    return typeof preorder !== 'undefined';
  }
}
