import { Query, Resolver } from '@nestjs/graphql';
import { ShowcaseService } from './showcase.service';
import { ShowcaseModel } from './showcase.model';
import { MediaService } from '../media/media.service';

@Resolver(() => ShowcaseModel)
export class ShowcaseResolver {
  constructor(
    private itemService: ShowcaseService,
    private mediaService: MediaService,
  ) {}

  @Query(() => [ShowcaseModel], { name: 'showcases' })
  async showcases(): Promise<ShowcaseModel[]> {
    return await this.itemService.items();
  }
}
