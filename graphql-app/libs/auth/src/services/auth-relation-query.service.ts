import {
  Class,
  DeepPartial,
  InjectQueryService,
  QueryService,
  RelationQueryService,
} from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { AuthQueryService } from '@app/auth/services/auth.query.service';

export function authRelationQueryService<DTO, C = DeepPartial<DTO>>(
  EntityClass: Class<any>,
): Class<any> {
  @Injectable()
  class AuthRelationQueryService extends RelationQueryService<DTO, C> {
    constructor(
      @InjectQueryService(EntityClass) service: QueryService<DTO>,
      private readonly authQueryService: AuthQueryService,
    ) {
      super(service, {
        author: {
          service: authQueryService,
          query: (dto) => {
            return {
              filter: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                uid: { eq: dto.authorUid },
              },
            };
          },
        },
      });
    }
  }

  return AuthRelationQueryService;
}

authRelationQueryService.getServiceToken = function getServiceToken(DTOClass: {
  name: string;
}) {
  return `${DTOClass.name}AuthoredQueryService`;
};
