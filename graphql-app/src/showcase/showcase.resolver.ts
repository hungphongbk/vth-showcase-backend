import { Resolver } from '@nestjs/graphql';
import { ShowcaseEntity } from './showcase.entity';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ShowcaseDto } from './showcase.dtos';

@Resolver(() => ShowcaseDto)
export class ShowcaseResolver extends CRUDResolver(ShowcaseDto, {
  create: { many: { disabled: true } },
  update: { many: { disabled: true } },
  delete: { many: { disabled: true } },
}) {
  constructor(
    @InjectQueryService(ShowcaseEntity)
    readonly service: QueryService<ShowcaseEntity>,
  ) {
    super(service);
  }
}
