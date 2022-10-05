import { Class, getQueryServiceToken } from '@nestjs-query/core';
import { FactoryProvider } from '@nestjs/common';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';
import { FirestoreQueryService } from './services';
import { EntityDTO } from './type';

export function createQueryFirestoreServiceProvider<DTO extends EntityDTO>(
  DTOClass: Class<DTO>,
): FactoryProvider {
  return {
    provide: getQueryServiceToken(DTOClass),
    useFactory(firebaseAdmin: FirebaseAdminSDK) {
      return new FirestoreQueryService(firebaseAdmin, DTOClass);
    },
    inject: [FIREBASE_ADMIN_INJECT],
  };
}
