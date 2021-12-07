import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { AuthDto } from '../../auth/dtos/auth.dto';
import { CommentRateEnum } from './comment.entity';
import { ShowcaseDto } from '../showcase/dtos/showcase.dtos';

registerEnumType(CommentRateEnum, { name: 'CommentRateEnum' });

@ObjectType()
@Relation('author', () => AuthDto, { nullable: true })
@Relation('showcase', () => ShowcaseDto, { nullable: false })
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
