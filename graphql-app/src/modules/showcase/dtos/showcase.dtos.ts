import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ShowcasePriceDto } from './showcasePrice.dto';
import { IShowcaseBrand } from '../interfaces/IShowcaseBrand';
import { ShowcaseBrandDto } from './showcaseBrand.dto';
import { ShowcaseHFDto } from '../../highlight-feature/dtos/showcaseHF.dto';
import { MediaDto } from '../../media/dtos/media.dto';

export enum ShowcaseStatus {
  COMING = 'coming soon',
  IDEA = 'idea',
  SHOWCASE = 'showcase',
}

registerEnumType(ShowcaseStatus, {
  name: 'ShowcaseStatus',
});

@ObjectType('Showcase')
@Relation('image', () => MediaDto)
@UnPagedRelation('highlightFeatures', () => ShowcaseHFDto)
export class ShowcaseDto {
  @Field(() => ID)
  id!: string;

  @FilterableField({ nullable: false })
  name!: string;

  @FilterableField({ allowedComparisons: ['eq', 'neq'] })
  @IDField(() => String, { name: 'slug' })
  slug!: string;

  @Field({ nullable: false })
  author!: string;

  @Field(() => ShowcaseBrandDto, { nullable: false })
  brand!: IShowcaseBrand;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
  @Field()
  description!: string;

  @FilterableField(() => ShowcaseStatus)
  status!: ShowcaseStatus;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
    defaultValue: null,
  })
  expectedSaleAt!: Date | null;

  @Field()
  expectedQuantity!: number;

  @Field(() => ShowcasePriceDto)
  expectedSalePrice!: ShowcasePriceDto;
}
