import {
  applyFilter,
  applyQuery,
  DeepPartial,
  Filter,
  NoOpQueryService,
  Query,
  QueryService,
} from '@nestjs-query/core';
import { FirebaseUserClass } from './auth.assembler';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';
import {
  CacheArg,
  CacheDecorator,
  CacheUpdater,
} from '../common/decorators/cache.decorator';
import { auth } from 'firebase-admin';

const AUTH_GET_BY_ID = Symbol('auth-get-by-id'),
  AUTH_GET_ALL = Symbol('auth-get-all');

@QueryService(FirebaseUserClass)
export class FirebaseAuthQueryService extends NoOpQueryService<FirebaseUserClass> {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {
    super();
  }

  @CacheDecorator({ key: AUTH_GET_BY_ID, ttl: 300 })
  getById(@CacheArg id: string | number): Promise<FirebaseUserClass> {
    return this._getById(id);
  }

  @CacheUpdater({ key: AUTH_GET_BY_ID, ttl: 300 })
  async updateOne(
    @CacheArg id: string | number,
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

  private async _getById(id: string | number): Promise<FirebaseUserClass> {
    return (await this.firebaseAdmin
      .auth()
      .getUser(id + '')) as unknown as Promise<FirebaseUserClass>;
  }

  @CacheDecorator({ key: AUTH_GET_ALL, ttl: 30 })
  private async _getAll(): Promise<FirebaseUserClass[]> {
    return (await this.firebaseAdmin.auth().listUsers(100))
      .users as unknown as FirebaseUserClass[];
  }
}
