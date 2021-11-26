import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { ShowcaseDto } from './showcase.dtos';
import { MediaModel } from '../../media/media.model';

@ObjectType({ isAbstract: true })
class ShowcaseCreateAdditionalDto {
  @Field(() => MediaModel)
  image: MediaModel;
}

@ObjectType({ isAbstract: true })
class ShowcaseCreateBase extends OmitType(
  ShowcaseDto,
  ['slug', 'createdAt', 'updatedAt'],
  InputType,
) {}

@InputType('ShowcaseCreateDto')
export class ShowcaseCreateDto extends IntersectionType(
  ShowcaseCreateBase,
  ShowcaseCreateAdditionalDto,
  InputType,
) {}
