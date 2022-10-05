import { NestFactory } from '@nestjs/core';
import { CronPubModule } from './cron-pub.module';

async function bootstrap() {
  const app = await NestFactory.create(CronPubModule);
  await app.listen(3001);
}
bootstrap();
