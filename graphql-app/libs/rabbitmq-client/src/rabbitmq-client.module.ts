import { Global, Module } from '@nestjs/common';
import { RabbitmqClientService } from './rabbitmq-client.service';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { VthConfigsModule, VthConfigsService } from '@app/configs';
import { RABBIT_MQ_MODULE, RABBIT_MQ_VTH_QUEUE } from './constants';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBIT_MQ_MODULE,
        imports: [VthConfigsModule],
        inject: [VthConfigsService],
        useFactory(config: VthConfigsService) {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [config.rabbitmq.connectionUri],
              queue: RABBIT_MQ_VTH_QUEUE,
            },
          } as ClientProvider;
        },
      },
    ]),
  ],
  providers: [RabbitmqClientService],
  exports: [RabbitmqClientService],
})
export class RabbitmqClientModule {}
