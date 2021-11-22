import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ShowcaseEntity } from './showcase.entity';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ShowcaseDto, ShowcasePriceDto } from './showcase.dtos';

@Resolver(() => ShowcaseDto)
export class ShowcaseResolver extends CRUDResolver(ShowcaseDto, {
  create: { many: { disabled: true } },
  update: { many: { disabled: true } },
  delete: { many: { disabled: true } },
  read: { one: { disabled: true } },
}) {
  constructor(
    @InjectQueryService(ShowcaseEntity)
    readonly service: QueryService<ShowcaseEntity>,
  ) {
    super(service);
  }

  @ResolveField(() => ShowcasePriceDto)
  expectedSalePrice(@Parent() showcase: ShowcaseDto) {
    return showcase.expectedSalePrice;
  }

  @Query(() => ShowcaseDto)
  async showcase(@Args('slug') slug: string): Promise<ShowcaseDto | undefined> {
    return (await this.service.query({ filter: { slug: { eq: slug } } }))[0];
  }

  @Query(() => [String])
  async slugs(): Promise<string[]> {
    return (await this.service.query({ paging: { limit: 10000 } })).map(
      (i) => i.slug,
    );
  }
}
