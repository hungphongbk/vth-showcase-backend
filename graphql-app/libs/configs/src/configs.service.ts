import { RabbitmqConfigService } from '@app/configs/rabbitmq-config.service';
import { Inject } from '@nestjs/common';

export class VthConfigsService {
  constructor(
    @Inject(RabbitmqConfigService)
    public readonly rabbitmq: RabbitmqConfigService,
  ) {}
}
