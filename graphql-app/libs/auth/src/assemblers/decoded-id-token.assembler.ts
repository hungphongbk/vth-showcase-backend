import { auth } from 'firebase-admin';
import {
  AbstractAssembler,
  AggregateQuery,
  AggregateResponse,
  Assembler,
  DeepPartial,
  Query,
} from '@nestjs-query/core';
import { AuthDto, AuthRoleType } from '../dtos/auth.dto';
import { NotImplementedException } from '@nestjs/common';
import DecodedIdToken = auth.DecodedIdToken;

class DecodedIdTokenClass implements DecodedIdToken {
  [key: string]: any;

  aud: string;
  auth_time: number;
  email?: string;
  exp: number;
  firebase: {
    identities: { [p: string]: any };
    sign_in_provider: string;
    sign_in_second_factor?: string;
    second_factor_identifier?: string;
    tenant?: string;
    [p: string]: any;
  };
  iat: number;
  iss: string;
  phone_number?: string;
  picture?: string;
  sub: string;
  uid: string;
}

@Assembler(AuthDto, DecodedIdTokenClass)
export class DecodedIdTokenAssembler extends AbstractAssembler<
  AuthDto,
  DecodedIdToken
> {
  convertAggregateQuery(
    aggregate: AggregateQuery<AuthDto>,
  ): AggregateQuery<DecodedIdToken> {
    throw new NotImplementedException();
  }

  convertAggregateResponse(
    aggregate: AggregateResponse<DecodedIdToken>,
  ): AggregateResponse<AuthDto> {
    throw new NotImplementedException();
  }

  convertQuery(query: Query<AuthDto>): Query<DecodedIdToken> {
    throw new NotImplementedException();
  }

  convertToCreateEntity(
    create: DeepPartial<AuthDto>,
  ): DeepPartial<DecodedIdToken> {
    throw new NotImplementedException();
  }

  convertToDTO(entity: DecodedIdToken): AuthDto {
    const dto = new AuthDto();
    dto.uid = entity.uid;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.phoneNumber = entity.phone_number;
    dto.photoURL = entity.picture;

    if (entity.superadmin) dto.role = AuthRoleType.SUPERADMIN;
    else if (entity.admin) dto.role = AuthRoleType.ADMIN;
    else if (entity.investor) dto.role = AuthRoleType.INVESTOR;
    else dto.role = AuthRoleType.USER;

    return dto;
  }

  convertToEntity(dto: AuthDto): DecodedIdToken {
    throw new NotImplementedException();
  }

  convertToUpdateEntity(
    update: DeepPartial<AuthDto>,
  ): DeepPartial<DecodedIdToken> {
    throw new NotImplementedException();
  }
}
