import {
  Field,
  ID,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import {
  FilterableField,
  QueryOptions,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { MediaDto } from '../media/dtos/media.dto';
import { GraphQLJSONObject } from 'graphql-scalars';

@ObjectType()
@UnPagedRelation('mediaList', () => MediaDto, {
  enableTotalCount: true,
  disableUpdate: true,
  disableRemove: true,
})
@QueryOptions({
  enableTotalCount: true,
})
export class BrandDto {
  @FilterableField(() => ID)
  id: number;

  @FilterableField(() => String)
  name: string;

  @FilterableField(() => String)
  slug: string;

  @Field()
  subtitle: string;

  @Field()
  description: string;

  @FilterableField({ nullable: true })
  logo: string;

  @Field(() => GraphQLJSONObject)
  metadata: any;
}

@InputType()
export class BrandCreateInputDto extends OmitType(
  BrandDto,
  ['id'],
  InputType,
) {}

@InputType()
export class BrandUpdateInputDto extends PartialType(BrandCreateInputDto) {}
