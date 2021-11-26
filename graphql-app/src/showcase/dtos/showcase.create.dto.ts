import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { ShowcaseDto } from './showcase.dtos';
import { MediaCreateDto } from '../../media/dtos/media.create.dto';

@ObjectType({ isAbstract: true })
class ShowcaseCreateAdditionalDto {
  @Field(() => MediaCreateDto)
  image: MediaCreateDto;
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
