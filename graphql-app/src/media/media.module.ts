import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { MediaEntity } from './media.entity';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MediaEntity])],
      resolvers: [{ DTOClass: MediaEntity, EntityClass: MediaEntity }],
    }),
  ],
})
export class MediaModule {}
