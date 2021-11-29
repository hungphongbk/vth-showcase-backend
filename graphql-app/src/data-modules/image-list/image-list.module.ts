import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ImageListEntity } from './entities/image-list.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CreateImageListInputDto } from './dto/create-image-list-input.dto';
import { ImageListDto } from './dto/image-list.dto';

const ormModule = NestjsQueryTypeOrmModule.forFeature([ImageListEntity]);

@Module({
  imports: [
    // NestjsQueryTypeOrmModule.forFeature([ImageListEntity])
    NestjsQueryGraphQLModule.forFeature({
      imports: [ormModule],
      resolvers: [
        {
          CreateDTOClass: CreateImageListInputDto,
          DTOClass: ImageListDto,
          EntityClass: ImageListEntity,
        },
      ],
    }),
    ormModule,
  ],
  exports: [ormModule],
})
export class ImageListModule {}
