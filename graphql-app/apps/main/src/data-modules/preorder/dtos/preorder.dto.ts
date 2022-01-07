import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { AuthDto } from '../../../auth';

@ObjectType()
@Relation('author', () => AuthDto, { nullable: true })
export class PreorderDto {
  @FilterableField(() => ID)
  id: number;

  authorUid: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}
