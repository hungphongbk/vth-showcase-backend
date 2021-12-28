import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ShowcaseHFBaseDto } from './showcaseHF.dto';
import { MediaCreateDto } from '../../media/dtos/media.create.dto';

@InputType()
export class ShowcaseHFUpdateInputDto extends PartialType(ShowcaseHFBaseDto) {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => MediaCreateDto, { nullable: true })
  image: MediaCreateDto;
}
