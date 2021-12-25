import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { PrjUpdateGraphqlOrmModule } from './prj-update.graphql.orm.module';
import { PrjUpdateDto } from './prj-update.dto';
import { PrjUpdateEntity } from './prj-update.entity';

export const PrjUpdateGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [PrjUpdateGraphqlOrmModule],
  resolvers: [
    {
      DTOClass: PrjUpdateDto,
      EntityClass: PrjUpdateEntity,
      read: { one: { disabled: true }, many: { disabled: true } },
      create: { one: { disabled: true }, many: { disabled: true } },
      update: { one: { disabled: true }, many: { disabled: true } },
      delete: { one: { disabled: true }, many: { disabled: true } },
    },
  ],
});
