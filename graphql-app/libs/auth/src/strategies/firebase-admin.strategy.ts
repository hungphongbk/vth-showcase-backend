import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  FirebaseAuthStrategy,
  FirebaseUser,
} from '@hungphongbk/nestjs-firebase-auth';
import { AuthDto, AuthRoleType } from '@app/auth/dtos/auth.dto';
import { PassportStrategy } from '@nestjs/passport';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';
import { DecodedIdTokenAssembler } from '@app/auth/assemblers/decoded-id-token.assembler';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class FirebaseAdminStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase-admin',
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
  async validate(payload: FirebaseUser): Promise<AuthDto> {
    const dto = this.decodedIdTokenAssembler.convertToDTO(payload);
    if (
      !(dto.role === AuthRoleType.ADMIN || dto.role === AuthRoleType.SUPERADMIN)
    )
      throw new UnauthorizedException();
    return dto;
  }
}
