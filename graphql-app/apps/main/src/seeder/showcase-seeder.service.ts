import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowcaseEntity } from '../data-modules/showcase/entities/showcase.entity';
import { Connection, Repository } from 'typeorm';
import {
  ShowcaseHFData,
  ShowcaseSeedData,
} from './showcase-data/showcase-data';
import { ShowcaseMediaEntity } from '../data-modules/showcase/entities/showcase.media.entity';
import { MediaSeederService } from './media-seeder.service';
import { ShowcaseHFEntity } from '../data-modules/highlight-feature/entities/showcaseHF.entity';
import { ShowcaseHFMediaEntity } from '../data-modules/highlight-feature/entities/showcaseHF.media.entity';
import { Cache } from 'cache-manager';
import { CacheDecorator } from '../common/decorators/cache.decorator';

@Injectable()
export class ShowcaseSeederService implements OnApplicationBootstrap {
  private logger = new Logger(ShowcaseSeederService.name);

  constructor(
    @InjectRepository(ShowcaseEntity)
    private readonly repo: Repository<ShowcaseEntity>,
    private readonly connection: Connection,
    private readonly mediaSeederService: MediaSeederService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async deleteOldShowcase(): Promise<void> {
    const entity = await this.repo.findOne({ slug: ShowcaseSeedData.slug });
    if (entity) await this.repo.delete(entity.id);
  }

  @CacheDecorator({ key: ShowcaseSeederService.name, ttl: 300 })
  async createNewSeedShowcase() {
    await this.deleteOldShowcase();
    this.logger.log('create new demo data');

    const imgEntity = await this.mediaSeederService.create(
      ShowcaseMediaEntity,
      'seeder/showcase-data/banner.png',
    );

    const hfEntities = await Promise.all(
      ShowcaseHFData.map(async (_entity, index) => {
        const entity = new ShowcaseHFEntity();
        Object.assign(entity, _entity);
        entity.image = await this.mediaSeederService.create(
          ShowcaseHFMediaEntity,
          `seeder/showcase-data/tinh-nang-${index + 1}.png`,
        );
        return entity;
      }),
    );

    const showcaseEntity = new ShowcaseEntity();
    Object.assign(showcaseEntity, ShowcaseSeedData);
    showcaseEntity.image = imgEntity;
    showcaseEntity.highlightFeatures = hfEntities;
    await this.repo.save(showcaseEntity);
  }

  onApplicationBootstrap() {
    return this.createNewSeedShowcase();
  }
}
