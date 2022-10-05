import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { BrandEntity } from './brand.entity';

export const BrandGraphqlOrmModule = NestjsQueryTypeOrmModule.forFeature([
  BrandEntity,
]);
