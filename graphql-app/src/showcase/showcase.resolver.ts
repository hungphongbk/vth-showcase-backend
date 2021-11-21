import { Args, Query, Resolver } from '@nestjs/graphql';
import { ShowcaseEntity } from './showcase.entity';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ShowcaseDto } from './showcase.dtos';

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

  @Query(() => ShowcaseDto)
  async showcase(@Args('slug') slug: string): Promise<ShowcaseDto | undefined> {
    return (await this.service.query({ filter: { slug: { eq: slug } } }))[0];
  }
}
