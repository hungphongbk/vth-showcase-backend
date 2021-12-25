import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { AuthDto } from '../../auth';
import { CommentRateEnum } from './comment.enum';

registerEnumType(CommentRateEnum, { name: 'CommentRateEnum' });

@ObjectType()
@Relation('author', () => AuthDto, { nullable: true })
export class CommentDto {
  @FilterableField(() => ID)
  id: number;

  authorUid: string;

  @Field()
  content: string;

  @Field(() => [CommentRateEnum])
  rate!: CommentRateEnum[];

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
