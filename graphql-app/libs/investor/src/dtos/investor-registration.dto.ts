import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@nestjs-query/query-graphql';

@ObjectType()
export class InvestorRegistrationDto {
  @IDField(() => ID)
  id: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  job: string;

  @Field()
  purpose: string;

  @Field()
  method: string;

  @Field()
  fund: string;

  @Field()
  promotedUid: string;
}
