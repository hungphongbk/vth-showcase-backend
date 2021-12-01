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

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {}
  @Post('login')
  async login(
    @Headers('X_TEST_UID') uid: string | null,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!uid) {
      res.status(HttpStatus.NOT_FOUND).send();
    } else {
      const token = await this.firebaseAdmin.auth().createCustomToken(uid);
      res.status(HttpStatus.OK);
      return { token };
    }
  }
}
