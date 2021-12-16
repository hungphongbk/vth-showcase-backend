import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

export enum AuthRoleType {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  INVESTOR = 'investor',
  USER = 'user',
}
registerEnumType(AuthRoleType, {
  name: 'AuthRoleType',
});

@ObjectType('User')
export class AuthDto {
  @FilterableField(() => ID)
  uid: string;

  @Field()
  name: string;

  @FilterableField()
  email: string;

  role: AuthRoleType;
}
