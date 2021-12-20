import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { UploadModule } from '@app/upload';

@Module({
  imports: [TerminusModule, UploadModule],
  controllers: [HealthController],
})
export class HealthModule {}
