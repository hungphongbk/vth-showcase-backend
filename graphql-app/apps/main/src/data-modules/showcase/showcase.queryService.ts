import {
  AssemblerQueryService,
  DeleteManyResponse,
  InjectQueryService,
  Query,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
import { MediaEntity } from '../media/media.entity';
import { ShowcaseMediaEntity } from './entities/showcase.media.entity';
import { PublishStatus, ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcaseEntity } from './entities/showcase.entity';
import { ShowcaseHFEntity } from '../highlight-feature/entities/showcaseHF.entity';
import { ImageListEntity } from '../image-list/entities/image-list.entity';
import {
  ShowcaseCreateInputDto,
  ShowcaseUpdateInputDto,
} from './dtos/showcase.create.dto';
import { CACHE_MANAGER, forwardRef, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Connection } from 'typeorm';
import { InjectAuthoredQueryService } from '../../auth';
import { ShowcaseAssembler } from './showcase.assembler';

const query = (showcase: ShowcaseDto): Query<any> => ({
  filter: {
    showcaseId: { eq: showcase.id },
  },
});

export class ShowcaseBaseQueryService extends AssemblerQueryService<
  ShowcaseDto,
  ShowcaseEntity,
  ShowcaseCreateInputDto,
  ShowcaseUpdateInputDto
> {
  constructor(
    @Inject(forwardRef(() => ShowcaseAssembler)) assembler: ShowcaseAssembler,
    @InjectAuthoredQueryService(ShowcaseEntity)
    private readonly service: QueryService<ShowcaseEntity>,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super(assembler, service);
  }
}

export class ShowcaseQueryService extends RelationQueryService<
  ShowcaseDto,
  ShowcaseCreateInputDto
> {
  constructor(
    private readonly service: ShowcaseBaseQueryService,
    @InjectQueryService(MediaEntity)
    private readonly mediaQueryService: QueryService<ShowcaseMediaEntity>,
    @InjectQueryService(ShowcaseHFEntity)
    private readonly hfQueryService: QueryService<ShowcaseHFEntity>,
    @InjectQueryService(ImageListEntity)
    private readonly imgListService: QueryService<ImageListEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private dbConnection: Connection,
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

  async getOneShowcase(slug: string): Promise<ShowcaseDto> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.service.query({ filter: { slug: { eq: slug } } }))[0];
  }

  async slugs() {
    return (
      await this.service.query({
        filter: {
          slug: { notLike: 'ci-test%' },
          publishStatus: { eq: PublishStatus.PUBLISHED },
        },
        paging: { limit: 10000 },
      })
    ).map((s) => s.slug);
  }

  async removeCiTests(): Promise<DeleteManyResponse> {
    return await this.service.deleteMany({
      slug: { like: 'ci-test%' },
    });
  }

  async updateOne(
    slug: string | number,
    update: ShowcaseUpdateInputDto,
  ): Promise<ShowcaseDto> {
    await super.updateMany(update, { slug: { eq: slug as string } });
    return await this.getOneShowcase(slug as string);
  }
}
