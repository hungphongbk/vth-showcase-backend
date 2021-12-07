import {
  InjectQueryService,
  Query,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
import { MediaEntity } from '../media/media.entity';
import { ShowcaseMediaEntity } from './entities/showcase.media.entity';
import { ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcaseEntity } from './entities/showcase.entity';
import { ShowcaseHFEntity } from '../highlight-feature/entities/showcaseHF.entity';
import { ImageListEntity } from '../image-list/entities/image-list.entity';
import { ShowcaseCreateInputDto } from './dtos/showcase.create.dto';
import { AuthEntity } from '../../auth/auth.entity';

const query = (showcase: ShowcaseDto): Query<any> => ({
  filter: {
    showcaseId: { eq: showcase.id },
  },
});

export class ShowcaseQueryService extends RelationQueryService<
  ShowcaseDto,
  ShowcaseCreateInputDto
> {
  constructor(
    @InjectQueryService(ShowcaseEntity)
    private readonly service: QueryService<ShowcaseDto>,
    @InjectQueryService(AuthEntity)
    private readonly authQueryService: QueryService<AuthEntity>,
    @InjectQueryService(MediaEntity)
    private readonly mediaQueryService: QueryService<ShowcaseMediaEntity>,
    @InjectQueryService(ShowcaseHFEntity)
    private readonly hfQueryService: QueryService<ShowcaseHFEntity>,
    @InjectQueryService(ImageListEntity)
    private readonly imgListService: QueryService<ImageListEntity>,
  ) {
    super(service, {
      author: {
        service: authQueryService,
        query: (showcase) => ({
          filter: {
            id: { eq: showcase.authorUid },
          },
        }),
      },
      image: {
        service: mediaQueryService,
        query,
      },
      highlightFeatures: {
        service: hfQueryService,
        query,
      },
      imageLists: {
        service: imgListService,
        query,
      },
    });
  }

  async getOneShowcase(slug: string): Promise<ShowcaseDto> {
    return (await this.service.query({ filter: { slug: { eq: slug } } }))[0]!;
  }
}
