import * as admin from 'firebase-admin';
import { auth } from 'firebase-admin';
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
import { AuthDto, AuthRoleType } from '../dtos/auth.dto';
import { pick, transform } from 'lodash';
import { NotImplementedException } from '@nestjs/common';
import { AuthUpdateDto } from '@app/auth/dtos/auth-update.dto';
import { UserProvider } from 'firebase-admin/auth';
import UpdateRequest = auth.UpdateRequest;

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
  customClaims?: {
    [key: string]: any;
  };

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
  createdAt: 'createdAt',
} as unknown as QueryFieldMap<AuthDto, FirebaseUserClass>;
const mapUserRecordToDto = reverse(mapDtoToUserRecord) as QueryFieldMap<
  FirebaseUserClass,
  AuthDto
>;
const mapDtoToUserQuery = {
  ...mapDtoToUserRecord,
  role: 'role',
} as unknown as QueryFieldMap<AuthDto, FirebaseUserClass>;
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
    return transformQuery(query, mapDtoToUserQuery);
  }

  convertToCreateEntity(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create: DeepPartial<AuthDto>,
  ): DeepPartial<FirebaseUserClass> {
    return this.convertToEntity(create as unknown as AuthDto);
  }

  convertToDTO(entity: FirebaseUserClass): AuthDto {
    const dto = new AuthDto();
    transformByMapper(entity, dto, mapUserRecordToDto);
    dto.role =
      (Object.keys(entity.customClaims ?? {})[0] as unknown as AuthRoleType) ??
      AuthRoleType.USER;
    dto.providedData = entity.providerData.map((data) =>
      pick(data, ['providerId', 'uid', 'displayName', 'email']),
    );
    dto.createdAt = new Date(entity.metadata.creationTime);
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

  convertToUpdateEntity(update: AuthUpdateDto): DeepPartial<FirebaseUserClass> {
    const entity = this.convertToEntity(
      update as unknown as AuthDto,
    ) as unknown as UpdateRequest & Pick<FirebaseUserClass, 'customClaims'>;
    if (update.role)
      entity.customClaims = {
        [update.role]: true,
      };
    if (update.providerToLink)
      entity.providerToLink = update.providerToLink as unknown as UserProvider;

    return entity;
  }

  convertAggregateQuery(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    aggregate: AggregateQuery<AuthDto>,
  ): AggregateQuery<FirebaseUserClass> {
    throw new NotImplementedException();
  }

  convertAggregateResponse(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    aggregate: AggregateResponse<FirebaseUserClass>,
  ): AggregateResponse<AuthDto> {
    throw new NotImplementedException();
  }
}
