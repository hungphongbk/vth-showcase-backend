import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import {
  FirebaseAuthStrategy,
  FirebaseUser,
} from '@tfarras/nestjs-firebase-auth';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { AuthEntity } from './auth.entity';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  'firebase',
) {
  public constructor(
    @InjectQueryService(AuthEntity)
    private readonly userService: QueryService<AuthDto>,
  ) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: FirebaseUser): Promise<AuthDto> {
    // Do here whatever you want and return your user
    let userObj = await this.userService.findById(payload.uid);
    if (!userObj) {
      userObj = await this.userService.createOne(payload);
    }
    return userObj;
  }
}
