import { Args, ArgsType, ID, Resolver } from '@nestjs/graphql';
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
import { ShowcaseHFMediaEntity } from './entities/showcaseHF.media.entity';
import { ShowcaseHFUpdateInputDto } from './dtos/showcaseHF.update.dto';

@ArgsType()
class CreateOneShowcaseHighlightFeatureInput extends MutationArgsType(
  ShowcaseHFCreateInputDto,
) {}
@ArgsType()
class UpdateOneShowcaseHighlightFeatureInput extends MutationArgsType(
  ShowcaseHFUpdateInputDto,
) {}

@Resolver(() => ShowcaseHFDto)
export class HighlightFeatureResolver {
  constructor(
    @InjectQueryService(ShowcaseHFEntity)
    private readonly service: QueryService<ShowcaseHFDto>,
    @InjectQueryService(ShowcaseHFMediaEntity)
    private readonly mediaQueryService: QueryService<ShowcaseHFMediaEntity>,
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

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => ShowcaseHFDto)
  async updateOneShowcaseHighlightFeature(
    @Args({ name: 'id', type: () => ID }) id: number,
    @MutationHookArgs() input: UpdateOneShowcaseHighlightFeatureInput,
  ) {
    const { image, ...rest } = input.input;
    if (image) {
      await this.mediaQueryService.deleteMany({ hfId: { eq: id } });
      const { id: imageId } = await this.mediaQueryService.createOne(image);
      await this.service.setRelation('image', id, imageId);
    }
    return await this.service.updateOne(id, rest);
  }
}
