import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { ImageListCreateDto } from './dto/image-list.create.dto';
import { ImageListDto } from './dto/image-list.dto';
import { ImageListEntity } from './entities/image-list.entity';
import { ImageListGraphqlOrmModule } from './image-list.graphql-orm.module';

export const ImageListGraphqlModule = NestjsQueryGraphQLModule.forFeature({
  imports: [ImageListGraphqlOrmModule],
  resolvers: [
    {
      CreateDTOClass: ImageListCreateDto,
      DTOClass: ImageListDto,
      EntityClass: ImageListEntity,
      read: { one: { disabled: true }, many: { disabled: true } },
      create: { one: { disabled: true }, many: { disabled: true } },
      update: { many: { disabled: true } },
      delete: { many: { disabled: true } },
    },
  ],
});
