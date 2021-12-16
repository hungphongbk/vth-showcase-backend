import { registerEnumType } from '@nestjs/graphql';

export enum UserStatusEnum {
  PENDING_CREATOR,
  APPROVED_CREATOR,
  PENDING_INVESTOR,
  APPROVED_INVESTOR,
}

registerEnumType(UserStatusEnum, { name: 'UserStatusEnum' });
