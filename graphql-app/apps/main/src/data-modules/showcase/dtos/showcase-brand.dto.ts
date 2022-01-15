import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ShowcaseBrandInterface } from '../interfaces/showcase-brand.interface';

@ObjectType('ShowcaseBrand')
@InputType('ShowcaseBrandInput')
export class ShowcaseBrandDto implements ShowcaseBrandInterface {
  @Field()
  name: string;

  @Field()
  description: string;
}
