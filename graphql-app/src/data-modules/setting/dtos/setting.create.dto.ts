import { Field, InputType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class SettingCreateDto {
  @FilterableField()
  key: string;

  @Field(() => GraphQLJSONObject)
  value: string;
}
