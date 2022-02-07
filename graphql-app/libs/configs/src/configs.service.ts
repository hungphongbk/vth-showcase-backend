import { RabbitmqConfigService } from '@app/configs/rabbitmq-config.service';
import { Inject } from '@nestjs/common';
import { FirebaseConfigService } from '@app/configs/firebase-config.service';

export class VthConfigsService {
  constructor(
    @Inject(RabbitmqConfigService)
    public readonly rabbitmq: RabbitmqConfigService,
    @Inject(FirebaseConfigService)
    public readonly firebase: FirebaseConfigService,
  ) {}
}
