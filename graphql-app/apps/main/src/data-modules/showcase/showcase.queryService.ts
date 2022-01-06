import {
  AssemblerQueryService,
  DeleteManyResponse,
  InjectQueryService,
  Query,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
import { PublishStatus, ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcaseEntity } from './entities/showcase.entity';
import {
  ShowcaseCreateInputDto,
  ShowcaseUpdateInputDto,
} from './dtos/showcase.create.dto';
import {
  CACHE_MANAGER,
  forwardRef,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectAuthoredQueryService } from '../../auth';
import { ShowcaseAssembler } from './showcase.assembler';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaCreateDto } from '../media/dtos/media.create.dto';
import { ShowcaseMediaEntity } from './entities/showcase.media.entity';

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
    @InjectQueryService(ShowcaseMediaEntity)
    private readonly mediaQueryService: QueryService<ShowcaseMediaEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(ShowcaseEntity)
    private readonly repo: Repository<ShowcaseEntity>,
  ) {
    super(service, {
      image: {
        service: mediaQueryService,
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
          and: [
            { slug: { notLike: 'ci-test%' } },
            { publishStatus: { eq: PublishStatus.PUBLISHED } },
          ],
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

  async updateImage(slug: string, image: MediaCreateDto) {
    const showcaseId = await this.getShowcaseIdFromSlug(slug);
    const { id } = await this.mediaQueryService.createOne(image);
    await this.mediaQueryService.deleteMany({ showcaseId: { eq: showcaseId } });
    await this.setRelation('image', showcaseId, id);
  }

  async updateOne(
    slug: string,
    update: ShowcaseUpdateInputDto,
  ): Promise<ShowcaseDto> {
    const { image, highlightFeatures, ...rest } = update;
    if (image) {
      await this.updateImage(slug, image);
    }
    await super.updateOne(await this.getShowcaseIdFromSlug(slug), rest);
    return await this.getOneShowcase(slug as string);
  }

  private async getShowcaseIdFromSlug(slug: string): Promise<number> {
    const entity = await this.repo.findOne(
      { slug },
      { select: ['id'], cache: 60 },
    );
    if (!entity) throw new NotFoundException(`slug ${slug} not found!`);
    return entity.id;
  }
}
