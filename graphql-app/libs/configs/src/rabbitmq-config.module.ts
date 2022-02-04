import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RabbitmqConfigService } from '@app/configs/rabbitmq-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_PORT: Joi.string().required(),
        RABBITMQ_USER: Joi.string().required(),
        RABBITMQ_PASS: Joi.string().required(),
      }),
    }),
  ],
  providers: [RabbitmqConfigService],
  exports: [RabbitmqConfigService],
})
export class RabbitmqConfigModule {}
