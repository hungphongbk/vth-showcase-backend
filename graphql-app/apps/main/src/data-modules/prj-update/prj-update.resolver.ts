import { Args, ArgsType, Resolver } from '@nestjs/graphql';
import { PrjUpdateCreateDto, PrjUpdateDto } from './prj-update.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { PrjUpdateEntity } from './prj-update.entity';
import { ShowcaseQueryService } from '../showcase/showcase.queryService';
import {
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';

@ArgsType()
class CreatePrjUpdateArgsType extends MutationArgsType(PrjUpdateCreateDto) {}

@Resolver(() => PrjUpdateDto)
export class PrjUpdateResolver {
  constructor(
    @InjectQueryService(PrjUpdateEntity)
    private readonly service: QueryService<PrjUpdateDto>,
    private readonly showcaseService: ShowcaseQueryService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => PrjUpdateDto)
  async postProjectUpdate(
    @Args('slug') slug: string,
    @MutationHookArgs() input: CreatePrjUpdateArgsType,
  ) {
    const update = await this.service.createOne(input.input);
    const showcase = await this.showcaseService.getOneShowcase(slug);
    await this.showcaseService.addRelations('updates', showcase.id, [
      update.id,
    ]);
    return update;
  }
}
