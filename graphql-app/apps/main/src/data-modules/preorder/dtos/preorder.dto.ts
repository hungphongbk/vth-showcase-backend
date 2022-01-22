import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  QueryOptions,
  Relation,
} from '@nestjs-query/query-graphql';
import { AuthDto } from '../../../auth';
import { ShowcaseDto } from '../../showcase/dtos/showcase.dto';

// @ObjectType()
// class ShowcasePreorderDto extends OmitType(
//   ShowcaseDto,
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   ['preorders'],
//   ObjectType,
// ) {}

@ObjectType()
@Relation('author', () => AuthDto, {
  nullable: true,
  disableUpdate: true,
  disableRemove: true,
})
@Relation('showcase', () => ShowcaseDto, {
  nullable: false,
  disableUpdate: true,
  disableRemove: true,
})
@QueryOptions({
  enableTotalCount: true,
})
export class PreorderDto {
  @FilterableField(() => ID)
  id: number;

  authorUid: string;
  showcaseId: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;
}
