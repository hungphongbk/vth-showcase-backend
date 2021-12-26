import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ImageListEntity } from './entities/image-list.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CreateImageListInputDto } from './dto/create-image-list-input.dto';
import { ImageListDto } from './dto/image-list.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageListMediaEntity } from './entities/image-list.media.entity';

const ormModule = NestjsQueryTypeOrmModule.forFeature([ImageListEntity]);

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageListEntity, ImageListMediaEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [ormModule],
      resolvers: [
        {
          CreateDTOClass: CreateImageListInputDto,
          DTOClass: ImageListDto,
          EntityClass: ImageListEntity,
          read: { many: { disabled: true } },
          create: { one: { disabled: true }, many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
        },
      ],
    }),
    ormModule,
  ],
  exports: [ormModule],
})
export class ImageListModule {}
