import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { MediaEntity } from './media.entity';
import { ShowcaseMediaEntity } from '../showcase/entities/showcase.media.entity';
import { ShowcaseHFMediaEntity } from '../highlight-feature/entities/showcaseHF.media.entity';
import { ImageListMediaEntity } from '../image-list/entities/image-list.media.entity';
import { BrandMediaEntity } from '../brand';

export const MediaOrmModule = NestjsQueryTypeOrmModule.forFeature([
  MediaEntity,
  ShowcaseMediaEntity,
  ShowcaseHFMediaEntity,
  ImageListMediaEntity,
  BrandMediaEntity,
]);
