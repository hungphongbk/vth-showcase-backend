import {
  Controller,
  Headers,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';
import fetch from 'node-fetch';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {}
  @Post('login')
  async login(
    @Headers('X-Test-Uid') uid: string | null,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!uid) {
      res.status(HttpStatus.NOT_FOUND).send();
    } else {
      // get custom token from firebase
      const customToken = await this.firebaseAdmin
        .auth()
        .createCustomToken(uid);
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
      res.status(HttpStatus.OK);
      return { token };
    }
  }
}
