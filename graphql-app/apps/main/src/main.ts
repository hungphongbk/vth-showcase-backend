import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.use(morgan('tiny'));

  // begin seeder
  // end seeder

  // 0.0.0.0 due to fastify specification
  // https://docs.nestjs.com/techniques/performance
  await app.listen(3000, '0.0.0.0');
  Logger.log('Showcase app has been started successfully on port 3000');
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
