import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        UPLOAD_HOST_TOKEN: Joi.string().required(),
        UPLOAD_INTERNAL_PORT: Joi.number().required(),
        UPLOAD_INTERNAL_HOST: Joi.string().required(),
      }),
    }),
  ],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
