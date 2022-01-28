import {
  applyFilter,
  applyQuery,
  DeepPartial,
  Filter,
  NoOpQueryService,
  Query,
  QueryService,
} from '@nestjs-query/core';
import { FirebaseUserClass } from './assemblers/auth.assembler';
import { Inject } from '@nestjs/common';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';
import { auth } from 'firebase-admin';

@QueryService(FirebaseUserClass)
export class FirebaseAuthQueryService extends NoOpQueryService<FirebaseUserClass> {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {
    super();
  }

  getById(id: string | number): Promise<FirebaseUserClass> {
    return this._getById(id);
  }

  async updateOne(
    id: string | number,
    update: DeepPartial<FirebaseUserClass>,
  ): Promise<FirebaseUserClass> {
    const { customClaims = undefined, ...fbupdate } = update;
    await this.firebaseAdmin
      .auth()
      .updateUser(id + '', fbupdate as unknown as auth.UpdateRequest);

    if (customClaims)
      await this.firebaseAdmin
        .auth()
        .setCustomUserClaims(id + '', customClaims);

    return await this._getById(id);
  }

  async query(query: Query<FirebaseUserClass>): Promise<FirebaseUserClass[]> {
    if (query.filter?.uid?.eq) {
      return [await this.getById(query.filter?.uid?.eq)];
    }
    return applyQuery(await this._getAll(), query);
  }

  async count(filter: Filter<FirebaseUserClass>): Promise<number> {
    return applyFilter(await this._getAll(), filter).length;
  }

  async createOne(
    item: DeepPartial<FirebaseUserClass>,
  ): Promise<FirebaseUserClass> {
    return (await this.firebaseAdmin
      .auth()
      .createUser(Object.assign({}, item))) as unknown as FirebaseUserClass;
  }

  private async _getById(id: string | number): Promise<FirebaseUserClass> {
    return (await this.firebaseAdmin
      .auth()
      .getUser(id + '')) as unknown as Promise<FirebaseUserClass>;
  }

  private async _getAll(): Promise<FirebaseUserClass[]> {
    return (await this.firebaseAdmin.auth().listUsers(1000))
      .users as unknown as FirebaseUserClass[];
  }
}
