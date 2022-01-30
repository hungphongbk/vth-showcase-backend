import { Module } from '@nestjs/common';
import { RemoveCiModule } from './remove-ci/remove-ci.module';

@Module({
  imports: [RemoveCiModule],
  providers: [],
})
export class CronModule {}
