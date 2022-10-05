import { AuthModule } from '@app/auth';
import { PreorderEntity } from '../entities/preorder.entity';
import { PreorderGraphqlOrmModule } from './preorder.graphql-orm.module';

export const PreorderAuthoredModule = AuthModule.forFeature({
  imports: [PreorderGraphqlOrmModule],
  EntityClass: PreorderEntity,
});
