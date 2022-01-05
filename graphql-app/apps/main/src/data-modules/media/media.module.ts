import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { MediaEntity } from './media.entity';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { MediaCreateDto } from './dtos/media.create.dto';
import { MediaDto } from './dtos/media.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowcaseMediaEntity } from '../showcase/entities/showcase.media.entity';
import { ShowcaseHFMediaEntity } from '../highlight-feature/entities/showcaseHF.media.entity';
import { ImageListMediaEntity } from '../image-list/entities/image-list.media.entity';

const mediaOrmModule = NestjsQueryTypeOrmModule.forFeature([
  MediaEntity,
  ShowcaseMediaEntity,
  ShowcaseHFMediaEntity,
  ImageListMediaEntity,
]);

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [mediaOrmModule],
      resolvers: [
        {
          CreateDTOClass: MediaCreateDto,
          DTOClass: MediaDto,
          EntityClass: MediaEntity,
        },
      ],
    }),
    mediaOrmModule,
  ],
  exports: [mediaOrmModule],
})
export class MediaModule {}
