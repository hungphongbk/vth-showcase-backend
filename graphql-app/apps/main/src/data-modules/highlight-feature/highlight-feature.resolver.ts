import { Args, ArgsType, Resolver } from '@nestjs/graphql';
import { ShowcaseHFDto } from './dtos/showcaseHF.dto';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import {
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { ShowcaseHFCreateInputDto } from './dtos/showcaseHF.create.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ShowcaseHFEntity } from './entities/showcaseHF.entity';
import { ShowcaseQueryService } from '../showcase/showcase.queryService';

@ArgsType()
class CreateOneShowcaseHighlightFeatureInput extends MutationArgsType(
  ShowcaseHFCreateInputDto,
) {}

@Resolver(() => ShowcaseHFDto)
export class HighlightFeatureResolver {
  constructor(
    @InjectQueryService(ShowcaseHFEntity)
    private readonly service: QueryService<ShowcaseHFDto>,
    private readonly showcaseService: ShowcaseQueryService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => ShowcaseHFDto)
  async createOneShowcaseHighlightFeature(
    @Args('slug') slug: string,
    @MutationHookArgs() input: CreateOneShowcaseHighlightFeatureInput,
  ) {
    const hf = await this.service.createOne(input.input);
    const showcase = await this.showcaseService.getOneShowcase(slug);
    await this.showcaseService.addRelations('highlightFeatures', showcase.id, [
      hf.id,
    ]);
    return hf;
  }
}
