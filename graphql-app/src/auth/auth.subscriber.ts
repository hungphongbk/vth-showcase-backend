import { AuthEntity } from './auth.entity';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Inject } from '@nestjs/common';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';

@EventSubscriber()
export class AuthSubscriber implements EntitySubscriberInterface<AuthEntity> {
  constructor(
    private readonly connection: Connection,
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return AuthEntity;
  }

  async setRoleAfterInsertAndUpdate(entity: AuthEntity) {
    await this.firebaseAdmin
      .auth()
      .setCustomUserClaims(entity.uid, { [entity.role]: true });
  }

  afterInsert(event: InsertEvent<AuthEntity>): Promise<any> | void {
    return this.setRoleAfterInsertAndUpdate(event.entity);
  }
  afterUpdate(event: UpdateEvent<AuthEntity>): Promise<any> | void {
    return this.setRoleAfterInsertAndUpdate(event.databaseEntity);
  }
}
