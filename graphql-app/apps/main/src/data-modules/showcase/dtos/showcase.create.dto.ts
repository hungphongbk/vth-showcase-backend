import {
  ArgsType,
  Field,
  ID,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { PublishStatus, ShowcaseDto } from './showcase.dto';
import { MediaCreateDto } from '../../media/dtos/media.create.dto';
import { ShowcaseHFCreateInputDto } from '../../highlight-feature/dtos/showcaseHF.create.dto';
import { ImageListCreateDto } from '../../image-list/dto/image-list.create.dto';
import { PrjUpdateCreateDto } from '../../prj-update/prj-update.dto';
import { MutationArgsType } from '@nestjs-query/query-graphql';

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
    'viewCount',
  ],
  InputType,
) {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => PublishStatus, { nullable: true })
  publishStatus?: PublishStatus;

  @Field(() => ID, { nullable: false })
  brandId: number;
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
) {
  viewCount?: number;

  @Field({ nullable: true })
  authorUid?: string;
}

@ArgsType()
export class CreateOneShowcase extends MutationArgsType(
  ShowcaseCreateInputDto,
) {}

@ArgsType()
export class UpdateOneShowcase extends MutationArgsType(
  ShowcaseUpdateInputDto,
) {}
