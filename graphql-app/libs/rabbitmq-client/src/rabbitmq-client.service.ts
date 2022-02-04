import { Inject, Injectable } from '@nestjs/common';
import { RABBIT_MQ_MODULE } from './constants';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitmqClientService {
  constructor(@Inject(RABBIT_MQ_MODULE) private readonly client: ClientProxy) {}

  public send(pattern: string, data: any) {
    const record = new RmqRecordBuilder(data)
      .setOptions({ persistent: false })
      .build();
    return lastValueFrom(this.client.send(pattern, record), {
      defaultValue: undefined,
    });
  }
}
