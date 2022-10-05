import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { PrjUpdateEntity } from './prj-update.entity';

export const PrjUpdateGraphqlOrmModule = NestjsQueryTypeOrmModule.forFeature([
  PrjUpdateEntity,
]);
