import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { uploadConfig } from '@app/upload/uploadConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        UPLOAD_HOST_TOKEN: Joi.string().required(),
        UPLOAD_PGPORT: Joi.number().required(),
        UPLOAD_PGHOST: Joi.string().required(),
        UPLOAD_HOST: Joi.string().required(),
        UPLOAD_PORT: Joi.string().required(),
      }),
      load: [uploadConfig],
    }),
  ],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
