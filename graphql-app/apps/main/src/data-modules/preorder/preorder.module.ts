import { Module } from '@nestjs/common';
import { PreorderOrmModule } from './modules/preorder.orm.module';
import { PreorderGraphqlOrmModule } from './modules/preorder.graphql-orm.module';
import { AuthModule } from '../../auth';
import { PreorderEntity } from './entities/preorder.entity';
import { PreorderResolver } from './preorder.resolver';
import { ShowcaseModule } from '../showcase/showcase.module';
import { PreorderGraphqlModule } from './modules/preorder.graphql.module';

const authoredModule = AuthModule.forFeature({
  imports: [PreorderGraphqlOrmModule],
  EntityClass: PreorderEntity,
});

@Module({
  imports: [
    PreorderOrmModule,
    PreorderGraphqlOrmModule,
    PreorderGraphqlModule,
    authoredModule,
    ShowcaseModule,
  ],
  providers: [PreorderResolver],
  exports: [PreorderGraphqlOrmModule],
})
export class PreorderModule {}
