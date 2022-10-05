import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ImageListEntity } from './entities/image-list.entity';
import { ImageListMediaEntity } from './entities/image-list.media.entity';

export const ImageListGraphqlOrmModule = NestjsQueryTypeOrmModule.forFeature([
  ImageListEntity,
  ImageListMediaEntity,
]);
