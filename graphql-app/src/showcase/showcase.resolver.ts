import { Args, Query, Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectAssemblerQueryService, QueryService } from '@nestjs-query/core';
import { ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcaseAssembler } from './showcase.assembler';
import { ShowcaseCreateDto } from './dtos/showcase.create.dto';

@Resolver(() => ShowcaseDto)
export class ShowcaseResolver extends CRUDResolver(ShowcaseDto, {
  CreateDTOClass: ShowcaseCreateDto,
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
