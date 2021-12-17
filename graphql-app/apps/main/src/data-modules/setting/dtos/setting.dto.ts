import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { GraphQLJSONObject } from 'graphql-scalars';

@ObjectType()
export class SettingDto {
  @IDField(() => ID)
  id: string;

  @FilterableField()
  key: string;

  @Field(() => GraphQLJSONObject)
  value: string;
}
