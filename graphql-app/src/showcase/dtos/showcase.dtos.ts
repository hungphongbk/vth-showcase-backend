import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { MediaEntity } from '../../media/media.entity';
import {
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import { ShowcasePriceDto } from './showcasePrice.dto';
import { IShowcase } from '../interfaces/IShowcase';
import { IShowcaseBrand } from '../interfaces/IShowcaseBrand';

export enum ShowcaseStatus {
  COMING = 'coming soon',
  IDEA = 'idea',
  SHOWCASE = 'showcase',
}

registerEnumType(ShowcaseStatus, {
  name: 'ShowcaseStatus',
});

@ObjectType('Showcase')
@Relation('image', () => MediaEntity)
export class ShowcaseDto implements IShowcase {
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
}
