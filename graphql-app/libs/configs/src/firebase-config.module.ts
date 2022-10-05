import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { FirebaseConfigService } from '@app/configs/firebase-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        FIREBASE_CONFIG: Joi.string().required(),
      }),
    }),
  ],
  providers: [FirebaseConfigService],
  exports: [FirebaseConfigService],
})
export class FirebaseConfigModule {}
