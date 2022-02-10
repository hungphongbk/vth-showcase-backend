import { Inject, Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { RabbitmqClientService } from '@app/rabbitmq-client';
import RmqMessages from '@app/configs/rabbitmq-messages';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';

@Injectable()
export class FcmService {
  constructor(
    private readonly rmqClient: RabbitmqClientService,
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {}

  public get subscribeToTopic() {
    return this.firebaseAdmin.messaging().subscribeToTopic;
  }

  async sendToTopic(
    topic: 'all' | string,
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
  ) {
    if (!topic && topic.trim().length === 0) {
      throw new Error('You provide an empty topic name!');
    }
    await this.rmqClient.send(RmqMessages.FCM_SEND_TO_TOPIC, {
      topic,
      payload,
      silent,
    });
  }
}
