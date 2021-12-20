import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { UPLOAD_CONFIG, UploadConfig } from '@app/upload/uploadConfig';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    @Inject(UPLOAD_CONFIG)
    private readonly config: UploadConfig,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('upload-service', this.config.publicPath),
    ]);
  }
}
