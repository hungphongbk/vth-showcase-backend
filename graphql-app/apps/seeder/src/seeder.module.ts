import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DataModulesModule } from 'apps/main/src/data-modules/data-modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        // ...
      }),
    }),
    DataModulesModule,
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
