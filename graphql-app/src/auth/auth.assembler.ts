import * as admin from 'firebase-admin';
import {
  AbstractAssembler,
  AggregateQuery,
  AggregateResponse,
  Assembler,
  DeepPartial,
  Query,
  QueryFieldMap,
  transformQuery,
} from '@nestjs-query/core';
import { AuthDto, AuthRoleType } from './dtos/auth.dto';
import { transform } from 'lodash';

export class FirebaseUserClass implements admin.auth.UserRecord {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  uid: string;
  disabled: boolean;
  emailVerified: boolean;
  metadata: admin.auth.UserMetadata;
  providerData: admin.auth.UserInfo[];
  customClaims: any;

  toJSON(): object {
    return undefined;
  }
}

function reverse(obj: any): any {
  return transform(
    obj,
    (res, val, key) => {
      res[val] = key;
    },
    {},
  );
}
const mapDtoToUserRecord = {
  uid: 'uid',
  name: 'displayName',
} as QueryFieldMap<AuthDto, FirebaseUserClass>;
const mapUserRecordToDto = reverse(mapDtoToUserRecord) as QueryFieldMap<
  FirebaseUserClass,
  AuthDto
>;
const transformByMapper = (
  original: any,
  destination: any,
  mapper: any,
): any => {
  return transform(
    original,
    (res, val, key) => {
      res[mapper[key] ?? key] = val;
    },
    destination,
  );
};

@Assembler(AuthDto, FirebaseUserClass)
export class AuthAssembler extends AbstractAssembler<
  AuthDto,
  FirebaseUserClass
> {
  convertQuery(query: Query<AuthDto>): Query<FirebaseUserClass> {
    return transformQuery(query, mapDtoToUserRecord);
  }

  convertToCreateEntity(
    create: DeepPartial<AuthDto>,
  ): DeepPartial<FirebaseUserClass> {
    return undefined;
  }

  convertToDTO(entity: FirebaseUserClass): AuthDto {
    const dto = new AuthDto();
    transformByMapper(entity, dto, mapUserRecordToDto);
    dto.role =
      (Object.keys(entity.customClaims)[0] as unknown as AuthRoleType) ??
      AuthRoleType.USER;
    return dto;
  }

  convertToEntity(dto: AuthDto): FirebaseUserClass {
    const entity = new FirebaseUserClass();
    transformByMapper(dto, entity, mapDtoToUserRecord);

    entity.customClaims = {
      [dto.role]: true,
    };

    return entity;
  }

  convertToUpdateEntity(
    update: DeepPartial<AuthDto>,
  ): DeepPartial<FirebaseUserClass> {
    const entity = new FirebaseUserClass();
    entity.customClaims = {
      [update.role]: true,
    };

    return entity;
  }

  convertAggregateQuery(
    aggregate: AggregateQuery<AuthDto>,
  ): AggregateQuery<FirebaseUserClass> {
    return undefined;
  }

  convertAggregateResponse(
    aggregate: AggregateResponse<FirebaseUserClass>,
  ): AggregateResponse<AuthDto> {
    return undefined;
  }
}
