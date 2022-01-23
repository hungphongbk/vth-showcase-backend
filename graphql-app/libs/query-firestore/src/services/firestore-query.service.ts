import {
  AggregateQuery,
  AggregateResponse,
  Class,
  DeepPartial,
  DeleteManyResponse,
  DeleteOneOptions,
  Filter,
  FindByIdOptions,
  FindRelationOptions,
  GetByIdOptions,
  ModifyRelationOptions,
  Query,
  QueryService,
  UpdateManyResponse,
  UpdateOneOptions,
} from '@nestjs-query/core';
import { FilterQueryBuilder } from '../query/filter-query.builder';
import { firestore } from 'firebase-admin';
import { NotFoundException } from '@nestjs/common';
import { FirebaseAdminSDK } from '@hungphongbk/nestjs-firebase-admin';
import { EntityDTO } from '../type';
import CollectionReference = firestore.CollectionReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import DocumentSnapshot = firestore.DocumentSnapshot;

export class FirestoreQueryService<DTO extends EntityDTO>
  implements QueryService<DTO, DeepPartial<DTO>, DeepPartial<DTO>>
{
  readonly filterQueryBuilder: FilterQueryBuilder<DTO>;
  readonly collection: CollectionReference<DTO>;
  constructor(
    readonly firebaseAdmin: FirebaseAdminSDK,
    readonly DTOClass: Class<DTO>,
  ) {
    this.collection = this.firebaseAdmin
      .firestore()
      .collection(DTOClass.name) as unknown as CollectionReference<DTO>;
    this.filterQueryBuilder = new FilterQueryBuilder<DTO>(this.collection);
  }

  async query(query: Query<DTO>): Promise<DTO[]> {
    return (await this.filterQueryBuilder.getAll(query).get()).docs.map(
      this.convertToDTO,
    );
  }

  async findById(
    id: string | number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    opts?: FindByIdOptions<DTO>,
  ): Promise<DTO | undefined> {
    const snapshot = await this.filterQueryBuilder.getById(id as string).get();
    if (snapshot.exists) return this.convertToDTO(snapshot);
    return undefined;
  }

  async count(filter: Filter<DTO>): Promise<number> {
    return (await this.filterQueryBuilder.getAll({ filter }).get()).size;
  }

  async getById(id: string | number, opts?: GetByIdOptions<DTO>): Promise<DTO> {
    const snapshot = await this.filterQueryBuilder.getById(id as string).get();
    if (!snapshot.exists) {
      throw new NotFoundException(
        `Unable to find ${this.DTOClass.name} with id: ${id}`,
      );
    }
    return this.convertToDTO(snapshot);
  }

  createMany(items: DeepPartial<DTO>[]): Promise<DTO[]> {
    return Promise.resolve([]);
  }

  async createOne(item: DeepPartial<DTO>): Promise<DTO> {
    const { id, ...rest } = item;
    let res,
      _id = id;
    if (!_id) {
      res = await this.collection.add(rest as unknown as DTO);
      _id = res.id;
    } else {
      res = await this.collection
        .doc(_id as unknown as string)
        .set(rest as unknown as DTO);
    }
    return await this.getById(_id as unknown as string);
  }

  deleteMany(filter: Filter<DTO>): Promise<DeleteManyResponse> {
    return Promise.resolve(undefined);
  }

  deleteOne(id: number | string, opts?: DeleteOneOptions<DTO>): Promise<DTO> {
    return Promise.resolve(undefined);
  }

  updateMany(
    update: DeepPartial<DTO>,
    filter: Filter<DTO>,
  ): Promise<UpdateManyResponse> {
    return Promise.resolve(undefined);
  }

  async updateOne(
    id: string | number,
    update: DeepPartial<DTO>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    opts?: UpdateOneOptions<DTO>,
  ): Promise<DTO> {
    await this.collection.doc(id as string).update(update as unknown as DTO);
    return await this.getById(id as string);
  }

  addRelations<Relation>(
    relationName: string,
    id: string | number,
    relationIds: (string | number)[],
    opts?: ModifyRelationOptions<DTO, Relation>,
  ): Promise<DTO> {
    return Promise.resolve(undefined);
  }

  aggregate(
    filter: Filter<DTO>,
    aggregate: AggregateQuery<DTO>,
  ): Promise<AggregateResponse<DTO>[]> {
    return Promise.resolve([]);
  }

  aggregateRelations<Relation>(
    RelationClass: Class<Relation>,
    relationName: string,
    dto: DTO,
    filter: Filter<Relation>,
    aggregate: AggregateQuery<Relation>,
  ): Promise<AggregateResponse<Relation>[]>;

  aggregateRelations<Relation>(
    RelationClass: Class<Relation>,
    relationName: string,
    dtos: DTO[],
    filter: Filter<Relation>,
    aggregate: AggregateQuery<Relation>,
  ): Promise<Map<DTO, AggregateResponse<Relation>[]>>;

  aggregateRelations(
    RelationClass,
    relationName: string,
    dto,
    filter,
    aggregate,
  ): any {
    return undefined;
  }

  countRelations<Relation>(
    RelationClass: Class<Relation>,
    relationName: string,
    dto: DTO,
    filter: Filter<Relation>,
  ): Promise<number>;

  countRelations<Relation>(
    RelationClass: Class<Relation>,
    relationName: string,
    dto: DTO[],
    filter: Filter<Relation>,
  ): Promise<Map<DTO, number>>;

  countRelations(RelationClass, relationName: string, dto, filter): any {
    return undefined;
  }

  findRelation<Relation>(
    RelationClass: Class<Relation>,
    relationName: string,
    dto: DTO,
    opts?: FindRelationOptions<Relation>,
  ): Promise<Relation | undefined>;

  findRelation<Relation>(
    RelationClass: Class<Relation>,
    relationName: string,
    dtos: DTO[],
    opts?: FindRelationOptions<Relation>,
  ): Promise<Map<DTO, Relation | undefined>>;

  findRelation(RelationClass, relationName: string, dto, opts?): any {
    return undefined;
  }

  queryRelations<Relation>(
    RelationClass: Class<Relation>,
    relationName: string,
    dto: DTO,
    query: Query<Relation>,
  ): Promise<Relation[]>;

  queryRelations<Relation>(
    RelationClass: Class<Relation>,
    relationName: string,
    dtos: DTO[],
    query: Query<Relation>,
  ): Promise<Map<DTO, Relation[]>>;

  queryRelations(RelationClass, relationName: string, dto, query): any {
    return undefined;
  }

  removeRelation<Relation>(
    relationName: string,
    id: string | number,
    relationId: string | number,
    opts?: ModifyRelationOptions<DTO, Relation>,
  ): Promise<DTO> {
    return Promise.resolve(undefined);
  }

  removeRelations<Relation>(
    relationName: string,
    id: string | number,
    relationIds: (string | number)[],
    opts?: ModifyRelationOptions<DTO, Relation>,
  ): Promise<DTO> {
    return Promise.resolve(undefined);
  }

  setRelation<Relation>(
    relationName: string,
    id: string | number,
    relationId: string | number,
    opts?: ModifyRelationOptions<DTO, Relation>,
  ): Promise<DTO> {
    return Promise.resolve(undefined);
  }

  setRelations<Relation>(
    relationName: string,
    id: string | number,
    relationIds: (string | number)[],
    opts?: ModifyRelationOptions<DTO, Relation>,
  ): Promise<DTO> {
    return Promise.resolve(undefined);
  }

  private convertToDTO(
    doc: QueryDocumentSnapshot<DTO> | DocumentSnapshot<DTO>,
  ) {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }
}
