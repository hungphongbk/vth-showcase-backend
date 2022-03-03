import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { PreorderOrmModule } from '../preorder/modules/preorder.orm.module';

export const BrandGraphqlOrmModule = NestjsQueryTypeOrmModule.forFeature([
  PreorderOrmModule,
]);
