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
    readonly service: QueryService<ShowcaseDto>,
    @InjectQueryService(MediaEntity)
    readonly mediaQueryService: QueryService<ShowcaseMediaEntity>,
    @InjectQueryService(ShowcaseHFEntity)
    readonly hfQueryService: QueryService<ShowcaseHFEntity>,
    @InjectQueryService(ImageListEntity)
    readonly imgListService: QueryService<ImageListEntity>,
  ) {
    super(service, {
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
}
