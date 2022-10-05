import { Module } from '@nestjs/common';
import { GaDataService } from './ga-data.service';
import { VthConfigsModule } from '@app/configs';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    VthConfigsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GA_PROPERTY_ID: Joi.string().required(),
      }),
    }),
  ],
  providers: [GaDataService],
  exports: [GaDataService],
})
export class GaDataModule {}
