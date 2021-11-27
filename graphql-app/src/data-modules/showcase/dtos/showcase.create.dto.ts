import { Field, InputType, OmitType } from '@nestjs/graphql';
import { ShowcaseDto } from './showcase.dtos';
import { MediaCreateDto } from '../../media/dtos/media.create.dto';
import { ShowcaseHFCreateInputDto } from '../../highlight-feature/dtos/showcaseHF.create.dto';
import { CreateImageListInputDto } from '../../image-list/dto/create-image-list-input.dto';

@InputType({ isAbstract: true })
class ShowcaseCreateBase extends OmitType(
  ShowcaseDto,
  ['id', 'slug', 'createdAt', 'updatedAt'],
  InputType,
) {
  @Field(() => String, { nullable: true })
  id?: string;
}

@InputType()
export class ShowcaseCreateInputDto extends ShowcaseCreateBase {
  @Field(() => MediaCreateDto)
  image!: MediaCreateDto;

  @Field(() => [ShowcaseHFCreateInputDto], { nullable: true })
  highlightFeatures?: ShowcaseHFCreateInputDto[];

  @Field(() => [CreateImageListInputDto], { nullable: true })
  imageLists?: CreateImageListInputDto[];
}
