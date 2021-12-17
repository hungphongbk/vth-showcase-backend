import {
  Body,
  CACHE_MANAGER,
  CacheInterceptor,
  Controller,
  Headers,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';
import fetch from 'node-fetch';
import { Cache } from 'cache-manager';
import { ControllerAuthGuard } from './gql.auth.guard';
import { AuthRoleType } from './dtos/auth.dto';
import { AuthQueryService } from './auth.query.service';

const CACHE_KEY = 'X-Test-Token';

@Controller('auth')
@UseInterceptors(CacheInterceptor)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: AuthQueryService,
  ) {}

  private static cacheKey(uid: string): string {
    return `${CACHE_KEY}:${uid}`;
  }

  @Post('login')
  async login(
    @Headers('X-Test-Uid') uid: string | null,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!uid) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    // check if exists in cache
    const exists = await this.cacheManager.get(AuthController.cacheKey(uid));
    if (exists) {
      this.logger.log('cache hit');
      res.status(HttpStatus.OK);
      return { token: exists };
    }

    // get custom token from firebase
    const customToken = await this.firebaseAdmin.auth().createCustomToken(uid);
    // verify custom token and turns it into ID token
    const { idToken: token } = (await (
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.GCLOUD_API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            token: customToken,
            returnSecureToken: true,
          }),
          headers: { 'Content-Type': 'application/json' },
        },
      )
    ).json()) as any;

    //set back to cache
    await this.cacheManager.set(AuthController.cacheKey(uid), token, {
      ttl: 3000,
    });

    res.status(HttpStatus.OK);
    return { token };
  }

  @Post('update-role/:uid')
  @UseGuards(ControllerAuthGuard)
  async updateRole(
    @Param('uid') uid: string,
    @Body('role') role: AuthRoleType,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.userService.updateOne(uid, { role });
      res.status(HttpStatus.OK).json({ status: 'ok' });
    } catch (e) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: e.message });
    }
  }
}
