import { Injectable } from '@nestjs/common';

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { VthConfigsService } from '@app/configs';
import { CredentialBody } from 'google-auth-library';

@Injectable()
export class GaDataService {
  private readonly _client: BetaAnalyticsDataClient;

  constructor(private readonly config: VthConfigsService) {
    this._client = new BetaAnalyticsDataClient({
      credentials: config.firebase.rawCredential as CredentialBody,
    });
  }
}
