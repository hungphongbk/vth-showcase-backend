import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import {
  FirebaseAuthStrategy,
  FirebaseUser,
} from '@tfarras/nestjs-firebase-auth';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { AuthModel } from './auth.model';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase',
) {
  public constructor(
    @InjectQueryService(AuthModel)
    private readonly userService: QueryService<AuthModel>,
  ) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: FirebaseUser): Promise<AuthModel> {
    // Do here whatever you want and return your user
    let userObj = await this.userService.findById(payload.uid);
    if (!userObj) {
      userObj = await this.userService.createOne(payload);
    }
    return userObj;
  }
}
