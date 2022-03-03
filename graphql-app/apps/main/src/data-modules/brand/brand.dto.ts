import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType()
export class BrandDto {
  @FilterableField(() => ID)
  id: number;

  @FilterableField(() => String)
  name: string;

  @FilterableField(() => String)
  slug: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  logo: string;
}
