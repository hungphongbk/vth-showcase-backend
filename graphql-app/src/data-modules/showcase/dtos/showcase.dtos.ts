import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ShowcasePriceDto } from './showcasePrice.dto';
import { IShowcaseBrand } from '../interfaces/IShowcaseBrand';
import { ShowcaseBrandDto } from './showcaseBrand.dto';
import { ImageListDto } from '../../image-list/dto/image-list.dto';
import { MediaDto } from '../../media/dtos/media.dto';
import { ShowcaseHFDto } from '../../highlight-feature/dtos/showcaseHF.dto';
import { AuthDto } from '../../../auth/dtos/auth.dto';
import { ShowcaseInventoryDto } from './showcaseInventory.dto';

export enum ShowcaseStatus {
  COMING = 'coming soon',
  IDEA = 'idea',
  SHOWCASE = 'showcase',
}

registerEnumType(ShowcaseStatus, {
  name: 'ShowcaseStatus',
});

export enum PublishStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

registerEnumType(PublishStatus, {
  name: 'PublishStatus',
});

@ObjectType('Showcase')
@Relation('image', () => MediaDto)
@Relation('author', () => AuthDto)
@UnPagedRelation('highlightFeatures', () => ShowcaseHFDto)
@UnPagedRelation('imageLists', () => ImageListDto)
export class ShowcaseDto {
  @Field(() => ID)
  id!: string;

  @FilterableField({ nullable: false })
  name!: string;

  @FilterableField({ allowedComparisons: ['eq', 'neq'] })
  @IDField(() => String, { name: 'slug' })
  slug!: string;

  authorUid: string;

  @Field(() => ShowcaseBrandDto, { nullable: false })
  brand!: IShowcaseBrand;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field()
  description!: string;

  @FilterableField(() => ShowcaseStatus)
  status!: ShowcaseStatus;

  @FilterableField(() => PublishStatus)
  publishStatus!: PublishStatus;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
    defaultValue: null,
  })
  expectedSaleAt!: Date | null;

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
    defaultValue: null,
  })
  expectedSaleEndAt!: Date | null;

  @Field()
  expectedQuantity!: number;

  @Field(() => ShowcasePriceDto, { nullable: true })
  expectedSalePrice!: ShowcasePriceDto;

  @Field(() => ShowcaseInventoryDto, { nullable: true })
  inventory!: ShowcaseInventoryDto;
}
