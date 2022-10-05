import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowcaseGaDto {
  @Field()
  viewCount: number;
}
