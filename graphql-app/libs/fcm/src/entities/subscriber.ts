import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { FcmRegistrationTokenEntity } from '@app/fcm/entities/fcm-registration-token.entity';
import { Inject } from '@nestjs/common';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';

@EventSubscriber()
export class FcmRegistrationTokenSubscriber
  implements EntitySubscriberInterface<FcmRegistrationTokenEntity>
{
  constructor(
    connection: Connection,
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return FcmRegistrationTokenEntity;
  }

  async afterInsert(
    event: InsertEvent<FcmRegistrationTokenEntity>,
  ): Promise<void> {
    await this.firebaseAdmin
      .messaging()
      .subscribeToTopic(event.entity.token, event.entity.topic);
  }
}
