import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ImageListEntity } from './entities/image-list.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { ImageListCreateDto } from './dto/image-list.create.dto';
import { ImageListDto } from './dto/image-list.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageListMediaEntity } from './entities/image-list.media.entity';
import { ImageListResolver } from './image-list.resolver';
import { MediaModule } from '../media/media.module';

const imageListOrmModule = NestjsQueryTypeOrmModule.forFeature([
  ImageListEntity,
]);

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageListEntity, ImageListMediaEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [imageListOrmModule],
      resolvers: [
        {
          CreateDTOClass: ImageListCreateDto,
          DTOClass: ImageListDto,
          EntityClass: ImageListEntity,
          read: { many: { disabled: true } },
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
        },
      ],
    }),
    imageListOrmModule,
    MediaModule,
  ],
  providers: [ImageListResolver],
  exports: [imageListOrmModule],
})
export class ImageListModule {}
