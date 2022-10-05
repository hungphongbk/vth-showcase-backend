import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { MediaEntity } from './media.entity';
import { MediaCreateDto } from './dtos/media.create.dto';
import { MediaDto } from './dtos/media.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaOrmModule } from './media-orm.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [MediaOrmModule],
      resolvers: [
        {
          CreateDTOClass: MediaCreateDto,
          DTOClass: MediaDto,
          EntityClass: MediaEntity,
        },
      ],
    }),
    MediaOrmModule,
  ],
  exports: [MediaOrmModule],
})
export class MediaModule {}
