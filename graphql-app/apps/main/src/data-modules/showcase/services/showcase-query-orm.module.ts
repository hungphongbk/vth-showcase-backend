import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShowcaseEntity } from '../entities/showcase.entity';
import { ShowcaseViewEntity } from '../entities/showcase-view.entity';

export const ShowcaseQueryOrmModule = NestjsQueryTypeOrmModule.forFeature([
  ShowcaseEntity,
  ShowcaseViewEntity,
]);
