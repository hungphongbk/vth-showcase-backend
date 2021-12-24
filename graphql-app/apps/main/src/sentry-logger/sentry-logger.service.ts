import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Scope } from '@sentry/node';
import { CaptureContext } from '@sentry/types';

@Injectable()
export class SentryLoggerService {
  constructor() {
    Sentry.init();
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
