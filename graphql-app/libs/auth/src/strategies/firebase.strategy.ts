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
import { AuthDto } from '../dtos/auth.dto';
import { DecodedIdTokenAssembler } from '../assemblers/decoded-id-token.assembler';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase',
) {
  public constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
    private readonly decodedIdTokenAssembler: DecodedIdTokenAssembler,
  ) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: FirebaseUser): Promise<AuthDto> {
    const dto = this.decodedIdTokenAssembler.convertToDTO(payload);
    return Promise.resolve(dto);
  }
}
