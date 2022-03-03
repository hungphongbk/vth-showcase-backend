import { Module } from '@nestjs/common';
import { BrandOrmModule } from './brand.orm.module';
import { BrandGraphqlOrmModule } from './brand.graphql-orm.module';
import { BrandGraphqlModule } from './brand.graphql.module';

@Module({
  imports: [BrandOrmModule, BrandGraphqlOrmModule, BrandGraphqlModule],
  exports: [BrandGraphqlOrmModule],
})
export class BrandModule {}
