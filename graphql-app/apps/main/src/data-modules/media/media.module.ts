import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { MediaEntity } from './media.entity';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { MediaCreateDto } from './dtos/media.create.dto';
import { MediaDto } from './dtos/media.dto';
import { TypeOrmModule } from '@nestjs/typeorm';

const mediaOrmModule = NestjsQueryTypeOrmModule.forFeature([MediaEntity]);

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
