import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { AuthRoleType } from '../auth.entity';

@ObjectType('User')
export class AuthDto {
  @FilterableField(() => ID)
  uid: string;

  @Field()
  name: string;

  @FilterableField()
  email: string;

  @FilterableField(() => AuthRoleType)
  role!: AuthRoleType;
}
