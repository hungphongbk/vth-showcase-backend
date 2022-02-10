import { Controller, Inject } from '@nestjs/common';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import RmqMessages from '@app/configs/rabbitmq-messages';
import * as firebaseAdmin from 'firebase-admin';
import { messaging } from 'firebase-admin';
import MessagingPayload = messaging.MessagingPayload;

@Controller()
export class FcmController {
  private readonly options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
  };
  private readonly optionsSilent = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
    content_available: true,
  };

  constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {}

  @MessagePattern(RmqMessages.FCM_SEND_TO_TOPIC)
  async sendToTopic(
    @Ctx() context: RmqContext,
    @Payload()
    {
      topic,
      payload,
      silent,
    }: {
      topic: 'all' | string;
      payload: MessagingPayload;
      silent: boolean;
    },
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      await firebaseAdmin
        .messaging()
        .sendToTopic(
          topic,
          payload,
          silent ? this.optionsSilent : this.options,
        );
    } catch (error) {
      throw error;
    }

    channel.ack(originalMessage);
  }
}
