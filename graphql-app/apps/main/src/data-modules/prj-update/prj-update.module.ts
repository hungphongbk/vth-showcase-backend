import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrjUpdateEntity } from './prj-update.entity';
import { PrjUpdateGraphqlModule } from './prj-update.graphql.module';
import { PrjUpdateGraphqlOrmModule } from './prj-update.graphql.orm.module';
import { PrjUpdateResolver } from './prj-update.resolver';
import { ShowcaseModule } from '../showcase/showcase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrjUpdateEntity]),
    PrjUpdateGraphqlOrmModule,
    PrjUpdateGraphqlModule,
    ShowcaseModule,
  ],
  providers: [PrjUpdateResolver],
  exports: [PrjUpdateGraphqlOrmModule],
})
export class PrjUpdateModule {}
