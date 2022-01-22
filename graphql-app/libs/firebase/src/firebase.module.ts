import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from '@hungphongbk/nestjs-firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { cert } from 'firebase-admin/app';

const firebaseAdminModule = FirebaseAdminModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      credential: cert(JSON.parse(configService.get('FIREBASE_CONFIG'))),
    };
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        FIREBASE_CONFIG: Joi.string().required(),
      }),
    }),
    firebaseAdminModule,
  ],
  exports: [firebaseAdminModule],
})
export class FirebaseModule {}
