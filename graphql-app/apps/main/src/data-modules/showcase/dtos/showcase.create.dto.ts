import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { PublishStatus, ShowcaseDto } from './showcase.dto';
import { MediaCreateDto } from '../../media/dtos/media.create.dto';
import { ShowcaseHFCreateInputDto } from '../../highlight-feature/dtos/showcaseHF.create.dto';
import { ImageListCreateDto } from '../../image-list/dto/image-list.create.dto';
import { PrjUpdateCreateDto } from '../../prj-update/prj-update.dto';

@InputType({ isAbstract: true })
class ShowcaseCreateBase extends OmitType(
  ShowcaseDto,
  [
    'id',
    'slug',
    'publishStatus',
    'createdAt',
    'updatedAt',
    'commentCount',
    'preorderCount',
  ],
  InputType,
) {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => PublishStatus, { nullable: true })
  publishStatus?: PublishStatus;
}

@InputType()
export class ShowcaseCreateInputDto extends ShowcaseCreateBase {
  @Field(() => MediaCreateDto)
  image!: MediaCreateDto;

  @Field(() => [ShowcaseHFCreateInputDto], { nullable: true })
  highlightFeatures?: ShowcaseHFCreateInputDto[];

  @Field(() => [ImageListCreateDto], { nullable: true })
  imageLists?: ImageListCreateDto[];

  @Field(() => [PrjUpdateCreateDto], { nullable: true })
  updates?: PrjUpdateCreateDto[];
}

@InputType()
export class ShowcaseUpdateInputDto extends PartialType(
  ShowcaseCreateInputDto,
) {}
