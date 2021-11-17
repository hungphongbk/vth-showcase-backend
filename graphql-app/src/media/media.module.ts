import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModel } from './media.model';
import { ConfigModule } from '@nestjs/config';
import { MediaResolver } from './media.resolver';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forFeature([MediaModel]),
  ],
  providers: [MediaService, MediaResolver],
  exports: [MediaService],
})
export class MediaModule {}
