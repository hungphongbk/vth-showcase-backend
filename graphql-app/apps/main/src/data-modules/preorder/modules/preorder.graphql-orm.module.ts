import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { PreorderEntity } from '../entities/preorder.entity';

export const PreorderGraphqlOrmModule = NestjsQueryTypeOrmModule.forFeature([
  PreorderEntity,
]);
