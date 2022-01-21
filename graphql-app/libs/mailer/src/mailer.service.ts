import { Inject, Injectable } from '@nestjs/common';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';

@Injectable()
export class MailerService {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT) private readonly admin: FirebaseAdminSDK,
  ) {}

  async sendPreorderNotify(payload: {
    email: string;
    name: string;
    product_name: string;
    // product_link: string;
  }) {
    await this.admin
      .firestore()
      .collection('mail')
      .add({
        to: [payload.email],
        template: {
          name: 'preorder-notify',
          data: {
            name: payload.name,
            product_name: payload.product_name,
          },
        },
      });
  }
}
