import { CronModule } from './cron.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { VthConfigsModule, VthConfigsService } from '@app/configs';

async function bootstrap() {
  const configApp = await NestFactory.createApplicationContext(
      VthConfigsModule,
    ),
    configService = configApp.get(VthConfigsService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CronModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [configService.rabbitmq.connectionUri],
        queue: 'rabbit-mq-vth',
        noAck: false,
      },
    },
  );

  await app.listen();
}
bootstrap();
