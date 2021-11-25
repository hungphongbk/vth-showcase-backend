import { ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { IShowcasePrice } from '../interfaces/IShowcasePrice';

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
