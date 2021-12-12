import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import {
  FirebaseAuthStrategy,
  FirebaseUser,
} from '@tfarras/nestjs-firebase-auth';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { AuthEntity, AuthRoleType } from './auth.entity';
import { AuthDto } from './dtos/auth.dto';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase',
) {
  public constructor(
    @InjectQueryService(AuthEntity)
    private readonly userService: QueryService<AuthDto>,
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: FirebaseUser): Promise<AuthDto> {
    // Do here whatever you want and return your user
    let userObj = await this.userService.findById(payload.uid);
    if (!userObj) {
      const newPayload: any = {
        ...payload,
        role:
          payload.claims.investor === true
            ? AuthRoleType.INVESTOR
            : AuthRoleType.USER,
      };
      userObj = await this.userService.createOne(newPayload);
    }
    return userObj;
  }
}
