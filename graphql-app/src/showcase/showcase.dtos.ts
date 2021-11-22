import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { MediaEntity } from '../media/media.entity';
import {
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';

export enum ShowcaseStatus {
  COMING = 'coming soon',
  IDEA = 'idea',
  SHOWCASE = 'showcase',
}

registerEnumType(ShowcaseStatus, {
  name: 'ShowcaseStatus',
});

export interface IShowcasePrice {
  regular: number;
  pioneer: number;
  promo: number;
  preorder: number;
}

export interface IShowcase {
  id: string;
  name: string;
  slug: string;
  author: string;
  status: ShowcaseStatus;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  expectedSaleAt: Date | null;
  expectedSalePrice: IShowcasePrice;
}

@ObjectType()
export class ShowcasePriceDto implements IShowcasePrice {
  @FilterableField()
  pioneer: number;

  @FilterableField()
  preorder: number;

  @FilterableField()
  promo: number;

  @FilterableField()
  regular: number;
}

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

  expectedSalePrice: ShowcasePriceDto;
}
