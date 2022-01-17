import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  FilterableField,
  QueryOptions,
  Relation,
} from '@nestjs-query/query-graphql';
import { AuthDto } from '../../auth';
import { CommentRateEnum } from './comment.enum';
import { SortDirection } from '@nestjs-query/core';

registerEnumType(CommentRateEnum, { name: 'CommentRateEnum' });

@ObjectType()
@Relation('author', () => AuthDto, { nullable: true })
@QueryOptions({
  defaultSort: [
    { field: 'isTopComment', direction: SortDirection.DESC },
    { field: 'createdAt', direction: SortDirection.DESC },
  ],
})
export class CommentDto {
  @FilterableField(() => ID)
  id: number;

  authorUid: string;

  @Field()
  content: string;

  @Field(() => [CommentRateEnum])
  rate!: CommentRateEnum[];

  @FilterableField(() => Boolean, { nullable: false })
  isTopComment!: boolean;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
