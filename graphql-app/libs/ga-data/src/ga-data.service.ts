import { Injectable } from '@nestjs/common';

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { VthConfigsService } from '@app/configs';
import { CredentialBody } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { google } from '@google-analytics/data/build/protos/protos';
import IRunReportRequest = google.analytics.data.v1alpha.IRunReportRequest;

@Injectable()
export class GaDataService {
  private readonly _client: BetaAnalyticsDataClient;
  private readonly propertyId: string;

  constructor(
    private readonly config: VthConfigsService,
    private readonly localConfig: ConfigService,
  ) {
    this._client = new BetaAnalyticsDataClient({
      credentials: config.firebase.rawCredential as CredentialBody,
    });
    this.propertyId = localConfig.get<string>('GA_PROPERTY_ID');
  }

  public runReport(request: Omit<IRunReportRequest, 'property'>) {
    return this._client.runReport({
      property: this.propertyId,
      ...request,
    });
  }
}
