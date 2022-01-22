import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { PreorderDto } from '../dtos/preorder.dto';
import { PreorderEntity } from '../entities/preorder.entity';
import { PreorderGraphqlOrmModule } from './preorder.graphql-orm.module';

export const PreorderGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [PreorderGraphqlOrmModule],
  resolvers: [
    {
      DTOClass: PreorderDto,
      EntityClass: PreorderEntity,
      // read: { one: { disabled: true }, many: { disabled: true } },
      create: { one: { disabled: true }, many: { disabled: true } },
      update: { one: { disabled: true }, many: { disabled: true } },
      delete: { one: { disabled: true }, many: { disabled: false } },
    },
  ],
});
