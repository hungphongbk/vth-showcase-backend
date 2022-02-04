import { Global, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VthConfigsModule, VthConfigsService } from '@app/configs';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'rabbit-mq-module',
        imports: [VthConfigsModule],
        inject: [VthConfigsService],
        useFactory(config: VthConfigsService) {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [config.rabbitmq.connectionUri],
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
