import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { VthConfigsService } from '@app/configs';
import { Transport } from '@nestjs/microservices';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

global.__rootdir__ = __dirname || process.cwd();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.use(morgan('tiny'));

  const configService = app.get(VthConfigsService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.rabbitmq.connectionUri],
      queue: 'rabbit-mq-vth',
      noAck: false,
    },
  });

  await app.startAllMicroservices();

  // 0.0.0.0 due to fastify specification
  // https://docs.nestjs.com/techniques/performance
  await app.listen(3000, '0.0.0.0');
  Logger.log('Showcase app has been started successfully on port 3000');
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
