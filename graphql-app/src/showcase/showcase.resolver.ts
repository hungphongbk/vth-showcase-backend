import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectAssemblerQueryService, QueryService } from '@nestjs-query/core';
import { ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcasePriceDto } from './dtos/showcasePrice.dto';
import { ShowcaseBrandDto } from './dtos/showcaseBrand.dto';
import { ShowcaseAssembler } from './showcase.assembler';

@Resolver(() => ShowcaseDto)
export class ShowcaseResolver extends CRUDResolver(ShowcaseDto, {
  create: { many: { disabled: true } },
  update: { many: { disabled: true } },
  delete: { many: { disabled: true } },
  read: { one: { disabled: true } },
}) {
  constructor(
    @InjectAssemblerQueryService(ShowcaseAssembler)
    readonly service: QueryService<ShowcaseDto>,
  ) {
    super(service);
  }

  @ResolveField(() => ShowcasePriceDto)
  expectedSalePrice(@Parent() showcase: ShowcaseDto) {
    return showcase.expectedSalePrice;
  }

  @ResolveField(() => ShowcaseBrandDto)
  brand(@Parent() showcase: ShowcaseDto) {
    return showcase.brand;
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
