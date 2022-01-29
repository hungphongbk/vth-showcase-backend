import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { AdminField } from '@app/auth/decorators/admin-field.decorator';

export enum AuthRoleType {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  INVESTOR = 'investor',
  USER = 'user',
}
registerEnumType(AuthRoleType, {
  name: 'AuthRoleType',
});

@ObjectType({ isAbstract: true })
class AuthProviderInfoDto {
  @Field()
  providerId: string;
}

@ObjectType('User')
export class AuthDto {
  @FilterableField(() => ID)
  uid: string;

  @Field()
  name: string;

  @FilterableField()
  email: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field()
  photoURL: string;

  @Field(() => AuthRoleType)
  role: AuthRoleType;

  @AdminField(() => [AuthProviderInfoDto], { nullable: true })
  providedData: AuthProviderInfoDto[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
