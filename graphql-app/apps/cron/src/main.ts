import { CronModule } from './cron.module';
import { CommandFactory } from 'nest-commander';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  await CommandFactory.run(CronModule, new ConsoleLogger());
}
bootstrap();
