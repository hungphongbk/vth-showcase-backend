import { Field, InputType } from '@nestjs/graphql';
import { ShowcaseHFBaseDto } from './showcaseHF.dto';
import { MediaCreateDto } from '../../media/dtos/media.create.dto';

@InputType()
export class ShowcaseHFCreateInputDto extends ShowcaseHFBaseDto {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => MediaCreateDto)
  image: MediaCreateDto;
}
