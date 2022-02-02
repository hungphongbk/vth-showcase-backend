import { Global, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'rabbit-mq-module',
        imports: [
          ConfigModule.forRoot({
            validationSchema: Joi.object({
              RABBITMQ_HOST: Joi.string().required(),
              RABBITMQ_PORT: Joi.string().required(),
            }),
          }),
        ],
        inject: [ConfigService],
        useFactory(config: ConfigService) {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [
                `amqp://${config.get('RABBITMQ_HOST')}:${config.get(
                  'RABBITMQ_PORT',
                )}`,
              ],
              queue: 'rabbit-mq-vth',
            },
          };
        },
      },
    ]),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
