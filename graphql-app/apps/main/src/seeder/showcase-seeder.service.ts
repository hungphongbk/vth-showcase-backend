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
import { ImageListMediaEntity } from '../data-modules/image-list/entities/image-list.media.entity';
import { ImageListEntity } from '../data-modules/image-list/entities/image-list.entity';

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

  async deleteOldShowcase(): Promise<boolean> {
    const entity = await this.repo.findOne({ slug: ShowcaseSeedData.slug });
    if (!entity) return true;
    if (
      entity &&
      entity.createdAt.getTime() !== ShowcaseSeedData.createdAt.getTime()
    ) {
      await this.repo.delete(entity.id);
      return true;
    }
    return false;
  }

  async createNewSeedShowcase() {
    const rs = await this.deleteOldShowcase();
    if (!rs) {
      this.logger.log('skip demo data creation. Use the old one');
      return;
    }
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
    //
    const imgListEntity = new ImageListEntity();
    imgListEntity.images = await Promise.all(
      ShowcaseHFData.map(async (_entity, index) => {
        return await this.mediaSeederService.create(
          ImageListMediaEntity,
          `seeder/showcase-data/tinh-nang-${index + 1}.png`,
        );
      }),
    );

    const showcaseEntity = new ShowcaseEntity();
    Object.assign(showcaseEntity, ShowcaseSeedData);
    showcaseEntity.image = imgEntity;
    showcaseEntity.highlightFeatures = hfEntities;
    showcaseEntity.imageLists = [imgListEntity];
    await this.repo.save(showcaseEntity);
    return 'cached';
  }

  onApplicationBootstrap() {
    return this.createNewSeedShowcase();
  }
}
