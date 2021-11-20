import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { ShowcaseService } from './showcase.service';
import { ShowcaseModel, ShowcasePreviewDto } from './showcase.model';

@Resolver(() => ShowcaseModel)
export class ShowcaseResolver {
  constructor(private itemService: ShowcaseService) {}

  @Query(() => [ShowcaseModel], { name: 'showcases' })
  async showcases(): Promise<ShowcaseModel[]> {
    return await this.itemService.getAll();
  }

  @Query(() => ShowcasePreviewDto, { name: 'showcase' })
  async showcase(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ): Promise<ShowcasePreviewDto> {
    const showcase = (await this.itemService.getOne(
      id,
    )) as unknown as ShowcasePreviewDto;
    showcase.relatedShowcases = await this.itemService.getRelated(id);
    return showcase;
  }
}
