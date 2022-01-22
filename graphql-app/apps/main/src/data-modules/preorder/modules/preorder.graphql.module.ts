import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { PreorderDto } from '../dtos/preorder.dto';
import { PreorderEntity } from '../entities/preorder.entity';
import { PreorderGraphqlOrmModule } from './preorder.graphql-orm.module';
import { PreorderAuthoredModule } from './preorder.authored.module';
import { PreorderQueryService } from '../preorder-query-service';

export const PreorderGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [PreorderGraphqlOrmModule, PreorderAuthoredModule],
  services: [PreorderQueryService],
  resolvers: [
    {
      DTOClass: PreorderDto,
      EntityClass: PreorderEntity,
      ServiceClass: PreorderQueryService,
      // read: { one: { disabled: true }, many: { disabled: true } },
      create: { one: { disabled: true }, many: { disabled: true } },
      update: { one: { disabled: true }, many: { disabled: true } },
      delete: { one: { disabled: true }, many: { disabled: false } },
    },
  ],
});
