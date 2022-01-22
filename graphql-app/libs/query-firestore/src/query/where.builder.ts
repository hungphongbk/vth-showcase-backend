import { firestore } from 'firebase-admin';
import {
  CommonFieldComparisonType,
  Filter,
  FilterComparisons,
  FilterFieldComparison,
  StringFieldComparisons,
} from '@nestjs-query/core';
import FireStoreQuery = firestore.Query;

export class WhereBuilder<DTO> {
  build(where: FireStoreQuery<DTO>, filter: Filter<DTO>): FireStoreQuery<DTO> {
    return this.filterFields(where, filter);
  }
  private filterFields(
    qb: FireStoreQuery<DTO>,
    filter: Filter<DTO>,
  ): FireStoreQuery<DTO> {
    return Object.keys(filter).reduce((w, field) => {
      const spec = this.getField(
        filter,
        field as keyof DTO,
      ) as StringFieldComparisons;
      return this.buildFieldComparison(w, field, spec);
    }, qb);
  }

  private getField<K extends keyof FilterComparisons<DTO>>(
    obj: FilterComparisons<DTO>,
    field: K,
  ): FilterFieldComparison<DTO[K]> {
    return obj[field] as FilterFieldComparison<DTO[K]>;
  }

  private buildFieldComparison(
    where: FireStoreQuery<DTO>,
    field: string,
    spec: CommonFieldComparisonType<any>,
  ): FireStoreQuery<DTO> {
    let qb = where;
    if (spec.eq) qb = qb.where(field, '==', spec.eq);
    if (spec.neq) qb = qb.where(field, '!=', spec.neq);
    if (spec.gt) qb = qb.where(field, '>', spec.gt);
    return qb;
  }
}
