import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { MediaEntity } from './media.entity';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { MediaCreateDto } from './dtos/media.create.dto';
import { MediaDto } from './dtos/media.dto';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MediaEntity])],
      resolvers: [
        {
          CreateDTOClass: MediaCreateDto,
          DTOClass: MediaDto,
          EntityClass: MediaEntity,
        },
      ],
    }),
  ],
})
export class MediaModule {}
