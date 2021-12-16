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
import { ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcaseEntity } from './entities/showcase.entity';
import { ShowcaseHFEntity } from '../highlight-feature/entities/showcaseHF.entity';
import { ImageListEntity } from '../image-list/entities/image-list.entity';
import { ShowcaseCreateInputDto } from './dtos/showcase.create.dto';
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
  ShowcaseEntity
> {
  constructor(
    @Inject(forwardRef(() => ShowcaseAssembler)) assembler: ShowcaseAssembler,
    @InjectAuthoredQueryService(ShowcaseEntity)
    private readonly service: QueryService<ShowcaseEntity>,
  ) {
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
      await this.dbConnection
        .createQueryBuilder()
        .select('showcase.slug')
        .from(ShowcaseEntity, 'showcase')
        .where("showcase.slug NOT LIKE 'ci-test%'")
        .limit(10000)
        .getMany()
    ).map((showcase) => showcase.slug);
  }

  async removeCiTests(): Promise<DeleteManyResponse> {
    return await this.service.deleteMany({
      slug: { like: 'ci-test%' },
    });
  }
}
