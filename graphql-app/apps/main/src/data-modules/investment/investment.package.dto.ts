import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType()
export class InvestmentPackageDto {
  @FilterableField(() => ID)
  id: number;

  @FilterableField()
  displayName: string;

  @Field()
  fundedRate: number;

  @Field()
  count: number;

  @Field()
  benefitRate: number;
}
