import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import { AuthDto } from '@app/auth';

@ObjectType()
@Relation('author', () => AuthDto, { nullable: true })
export class FcmRegistrationTokenDto {
  @IDField(() => ID)
  id: string;

  @FilterableField()
  token: string;

  @FilterableField()
  topic: string;

  authorUid: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
