import { QueryService, RelationQueryService } from '@nestjs-query/core';
import { FcmRegistrationTokenDto } from '@app/fcm/dtos/fcm-registration-token.dto';
import { InjectAuthoredQueryService } from '@app/auth';
import { FcmRegistrationTokenEntity } from '@app/fcm/entities/fcm-registration-token.entity';

@QueryService(FcmRegistrationTokenDto)
export class FcmRegistrationTokenDtoQueryService extends RelationQueryService<FcmRegistrationTokenDto> {
  constructor(
    @InjectAuthoredQueryService(FcmRegistrationTokenEntity)
    service: QueryService<FcmRegistrationTokenDto>,
  ) {
    super(service, {});
  }
}
