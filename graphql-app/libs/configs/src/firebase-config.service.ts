import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, ServiceAccount } from 'firebase-admin/app';
import { CredentialBody } from 'google-auth-library';

@Injectable()
export class FirebaseConfigService {
  constructor(private readonly config: ConfigService) {}

  get rawCredential(): ServiceAccount | CredentialBody {
    return JSON.parse(this.config.get<string>('FIREBASE_CONFIG'));
  }

  get credential() {
    return cert(this.rawCredential as ServiceAccount);
  }
}
