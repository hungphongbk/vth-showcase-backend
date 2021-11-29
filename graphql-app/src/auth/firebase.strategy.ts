import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { FirebaseAuthStrategy } from '@tfarras/nestjs-firebase-auth';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase',
) {
  public constructor() {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // async validate(payload: FirebaseUser): Promise<FirebaseUser> {
  //   // Do here whatever you want and return your user
  //   console.log(payload);
  //   return payload;
  // }
}
