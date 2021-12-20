import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowcaseEntity } from '../data-modules/showcase/entities/showcase.entity';
import { Connection, Repository } from 'typeorm';
import { UploadService } from '@app/upload';
import { ShowcaseSeedData } from './showcase-data/showcase-data';
import { join } from 'path';
import { ShowcaseMediaEntity } from '../data-modules/showcase/entities/showcase.media.entity';

@Injectable()
export class ShowcaseSeederService implements OnApplicationBootstrap {
  private logger = new Logger(ShowcaseSeederService.name);

  constructor(
    @InjectRepository(ShowcaseEntity)
    private readonly repo: Repository<ShowcaseEntity>,
    private readonly connection: Connection,
    @Inject(UploadService) private readonly upload: UploadService,
  ) {}

  findShowcaseData(): Promise<ShowcaseEntity | undefined> {
    return this.repo.findOne({ slug: ShowcaseSeedData.slug });
  }

  async onApplicationBootstrap(): Promise<void> {
    if (await this.findShowcaseData()) return;
    this.logger.log('create new demo data');

    const image = await this.upload.execute(
        join(__dirname, 'seeder/showcase-data/banner.png'),
      ),
      imgEntity = new ShowcaseMediaEntity();
    imgEntity.path = image.path;
    imgEntity.preloadUrl = image.preload;
    imgEntity.filename = 'foo.webp';
    imgEntity.mimetype = 'image/webp';

    const showcaseEntity = new ShowcaseEntity();
    Object.assign(showcaseEntity, ShowcaseSeedData);
    showcaseEntity.image = imgEntity;
    await this.repo.save(showcaseEntity);
  }
}
