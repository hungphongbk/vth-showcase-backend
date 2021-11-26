import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { MediaModel } from './media.model';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MediaModel])],
      resolvers: [{ DTOClass: MediaModel, EntityClass: MediaModel }],
    }),
  ],
})
export class MediaModule {}
