import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Scope } from '@sentry/node';
import { CaptureContext } from '@sentry/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SentryLoggerService {
  constructor(private readonly configService: ConfigService) {
    Sentry.init({
      environment: this.configService.get<string | undefined>('APP_ENV'),
    });
  }

  get Severity() {
    return Sentry.Severity;
  }

  captureException(exception: any, captureContext?: CaptureContext) {
    return Sentry.captureException(exception, captureContext);
  }

  withScope(callback: (scope: Scope) => void): void {
    Sentry.withScope(callback);
  }
}
