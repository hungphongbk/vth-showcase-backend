import { Query, Resolver } from '@nestjs/graphql';
import { ShowcaseDto } from './showcase.dto';
import { ShowcaseService } from './showcase.service';

@Resolver(() => ShowcaseDto)
export class ShowcaseResolver {
  constructor(private itemService: ShowcaseService) {}

  @Query(() => [ShowcaseDto])
  async items(): Promise<ShowcaseDto[]> {
    return await this.itemService.items();
  }
}
