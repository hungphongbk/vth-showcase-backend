import { Module } from '@nestjs/common';
import { PreorderOrmModule } from './modules/preorder.orm.module';
import { PreorderGraphqlOrmModule } from './modules/preorder.graphql-orm.module';
import { AuthModule } from '../../auth';
import { PreorderEntity } from './entities/preorder.entity';
import { PreorderResolver } from './preorder.resolver';
import { ShowcaseModule } from '../showcase/showcase.module';
import { PreorderUserResolver } from './preorder.user.resolver';

const authoredModule = AuthModule.forFeature({
  imports: [PreorderGraphqlOrmModule],
  EntityClass: PreorderEntity,
});

@Module({
  imports: [
    PreorderOrmModule,
    PreorderGraphqlOrmModule,
    authoredModule,
    ShowcaseModule,
  ],
  providers: [PreorderResolver, PreorderUserResolver],
  exports: [PreorderGraphqlOrmModule],
})
export class PreorderModule {}
