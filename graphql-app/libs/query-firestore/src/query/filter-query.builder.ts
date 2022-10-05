import { Filter, Query } from '@nestjs-query/core';
import { firestore } from 'firebase-admin';
import { WhereBuilder } from './where.builder';
import CollectionReference = firestore.CollectionReference;
import FireStoreQuery = firestore.Query;

export class FilterQueryBuilder<DTO> {
  constructor(
    readonly collection: CollectionReference<DTO>,
    readonly whereBuilder = new WhereBuilder<DTO>(),
  ) {}
  getAll(query: Query<DTO>): FireStoreQuery<DTO> {
    let qb = this.collection as FireStoreQuery<DTO>;
    qb = this.applyFilter(qb, query.filter);
    return qb;
  }
  getById(id: string) {
    return this.collection.doc(id);
  }

  applyFilter(
    qb: FireStoreQuery<DTO>,
    filter?: Filter<DTO>,
  ): FireStoreQuery<DTO> {
    if (!filter) return qb;
    return this.whereBuilder.build(qb, filter);
  }
}
