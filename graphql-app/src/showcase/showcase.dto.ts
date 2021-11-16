import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowcaseDto {
  @Field(() => ID)
  id: number;
}
