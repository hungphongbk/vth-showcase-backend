import { InputType, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ShowcasePriceInterface } from '../interfaces/showcase-price.interface';

@ObjectType('ShowcasePrice')
@InputType('ShowcasePriceInput')
export class ShowcasePriceDto implements ShowcasePriceInterface {
  @FilterableField()
  pioneer: number;

  @FilterableField()
  preorder: number;

  @FilterableField()
  promo: number;

  @FilterableField()
  regular: number;
}
