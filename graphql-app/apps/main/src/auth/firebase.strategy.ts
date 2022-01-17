import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import {
  FirebaseAuthStrategy,
  FirebaseUser,
} from '@hungphongbk/nestjs-firebase-auth';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';
import { AuthDto } from './dtos/auth.dto';
import { AuthQueryService } from './services/auth.query.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase',
) {
  public constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
    private readonly service: AuthQueryService,
  ) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: FirebaseUser): Promise<AuthDto> {
    return this.service.getById(payload.uid);
  }
}
