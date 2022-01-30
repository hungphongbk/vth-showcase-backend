import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FcmService {
  private readonly options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
  };

  private readonly optionsSilent = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
    content_available: true,
  };

  async sendToTopic(
    topic: 'all' | string,
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
  ) {
    if (!topic && topic.trim().length === 0) {
      throw new Error('You provide an empty topic name!');
    }
    let result = null;
    try {
      result = await firebaseAdmin
        .messaging()
        .sendToTopic(
          topic,
          payload,
          silent ? this.optionsSilent : this.options,
        );
    } catch (error) {
      throw error;
    }
    return result;
  }
}
