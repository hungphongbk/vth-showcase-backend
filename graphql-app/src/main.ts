import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.use(morgan('tiny'));
  // 0.0.0.0 due to fastify specification
  // https://docs.nestjs.com/techniques/performance
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
