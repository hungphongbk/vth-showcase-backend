import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType()
export class PrjUpdateDto {
  @FilterableField(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field()
  content: string;
}

@InputType()
export class PrjUpdateCreateDto {
  @Field()
  content: string;
}
