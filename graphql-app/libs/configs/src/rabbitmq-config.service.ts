import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitmqConfigService {
  constructor(private readonly config: ConfigService) {}

  get connectionUri() {
    return `amqp://${this.config.get('RABBITMQ_USER')}:${this.config.get(
      'RABBITMQ_PASS',
    )}@${this.config.get('RABBITMQ_HOST')}:${this.config.get('RABBITMQ_PORT')}`;
  }
}
