import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IShowcaseBrand } from '../interfaces/IShowcaseBrand';

@ObjectType('ShowcaseBrand')
@InputType('ShowcaseBrandInput')
export class ShowcaseBrandDto implements IShowcaseBrand {
  @Field()
  name: string;

  @Field()
  description: string;
}
