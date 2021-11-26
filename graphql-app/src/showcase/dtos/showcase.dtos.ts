import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { MediaModel } from '../../media/media.model';
import {
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ShowcasePriceDto } from './showcasePrice.dto';
import { IShowcaseBrand } from '../interfaces/IShowcaseBrand';
import { MediaInterface } from '../../gql/interfaces/media.interface';
import { ShowcaseHighlightFeatureModel } from '../entities/showcaseHighlightFeature.model';

export enum ShowcaseStatus {
  COMING = 'coming soon',
  IDEA = 'idea',
  SHOWCASE = 'showcase',
}

registerEnumType(ShowcaseStatus, {
  name: 'ShowcaseStatus',
});

@ObjectType('Showcase', {
  implements: () => [MediaInterface],
})
@Relation('image', () => MediaModel)
@UnPagedRelation('highlightFeatures', () => ShowcaseHighlightFeatureModel)
export class ShowcaseDto implements MediaInterface {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: false })
  name!: string;

  @FilterableField({ allowedComparisons: ['eq', 'neq'] })
  @IDField(() => String, { name: 'slug' })
  slug!: string;

  @Field({ nullable: false })
  author!: string;

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

  expectedSalePrice: ShowcasePriceDto;
  image!: MediaModel;
}
