import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { UploadModule } from '@app/upload';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule, UploadModule],
  controllers: [HealthController],
})
export class HealthModule {}
