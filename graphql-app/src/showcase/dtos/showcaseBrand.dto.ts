import { Field, ObjectType } from '@nestjs/graphql';
import { IShowcaseBrand } from '../interfaces/IShowcaseBrand';

@ObjectType('ShowcaseBrand')
export class ShowcaseBrandDto implements IShowcaseBrand {
  @Field()
  name: string;

  @Field()
  description: string;
}
