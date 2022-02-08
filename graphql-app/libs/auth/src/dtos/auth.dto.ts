import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  ObjectType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { AdminField } from '@app/auth/decorators';

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
export class AuthProviderInfoDto {
  @Field()
  uid: string;

  @Field()
  displayName: string;

  @Field()
  email: string;

  @Field()
  providerId: string;
}

@InputType()
export class AuthProviderInfoInputDto extends PartialType(
  AuthProviderInfoDto,
  InputType,
) {}

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
