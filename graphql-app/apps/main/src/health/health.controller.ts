import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { UploadService } from '@app/upload';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    @Inject(UploadService)
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.uploadService.pingcheck()]);
  }
}
