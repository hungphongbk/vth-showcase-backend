import { Query, Resolver } from '@nestjs/graphql';
import { ShowcaseService } from './showcase.service';
import { ShowcaseModel } from './showcase.model';

@Resolver(() => ShowcaseModel)
export class ShowcaseResolver {
  constructor(private itemService: ShowcaseService) {}

  @Query(() => [ShowcaseModel])
  async items(): Promise<ShowcaseModel[]> {
    return await this.itemService.items();
  }
}
