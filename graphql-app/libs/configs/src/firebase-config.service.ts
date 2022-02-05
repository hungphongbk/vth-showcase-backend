import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert } from 'firebase-admin/app';

@Injectable()
export class FirebaseConfigService {
  constructor(private readonly config: ConfigService) {}

  get credential() {
    return cert(JSON.parse(this.config.get<string>('FIREBASE_CONFIG')));
  }
}
