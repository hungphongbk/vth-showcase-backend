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
  QueryOptions,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ShowcasePriceDto } from './showcase-price.dto';
import { MediaDto } from '../../media/dtos/media.dto';
import { ShowcaseHFDto } from '../../highlight-feature/dtos/showcaseHF.dto';
import { ShowcaseInventoryDto } from './showcase-inventory.dto';
import { CommentDto } from '../../comment/comment.dto';
import { AuthDto } from '@app/auth';
import { PrjUpdateDto } from '../../prj-update/prj-update.dto';
import { PreorderDto } from '../../preorder/dtos/preorder.dto';
// noinspection ES6PreferShortImport
import { BrandDto } from '../../brand/brand.dto';
import { ShowcaseInvestPkgDto } from '../../showcase-invest-pkg/showcase-invest-pkg.dto';

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
@Relation('brand', () => BrandDto)
@UnPagedRelation('highlightFeatures', () => ShowcaseHFDto, {
  disableUpdate: true,
  disableRemove: true,
})
@UnPagedRelation('comments', () => CommentDto, {
  enableTotalCount: true,
  disableUpdate: true,
  disableRemove: true,
})
@UnPagedRelation('updates', () => PrjUpdateDto, {
  enableTotalCount: true,
  disableRemove: true,
  disableUpdate: true,
})
@UnPagedRelation('preorders', () => PreorderDto, {
  enableTotalCount: true,
  disableUpdate: true,
  disableRemove: true,
})
@UnPagedRelation('showcasePkg', () => ShowcaseInvestPkgDto)
@QueryOptions({
  defaultFilter: { publishStatus: { eq: PublishStatus.PUBLISHED } },
  enableTotalCount: true,
})
export class ShowcaseDto {
  @Field(() => ID)
  id!: string;

  @FilterableField({ nullable: false })
  name!: string;

  @FilterableField({ allowedComparisons: ['eq', 'neq'] })
  @IDField(() => String, { name: 'slug' })
  slug!: string;

  authorUid: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field()
  description!: string;

  @FilterableField(() => ShowcaseStatus)
  status!: ShowcaseStatus;

  @FilterableField(() => PublishStatus)
  publishStatus!: PublishStatus;

  @FilterableField({ nullable: true })
  isFeatured: boolean;

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

  @Field(() => ShowcasePriceDto, { nullable: true })
  expectedQuantity!: ShowcasePriceDto;

  @Field(() => ShowcasePriceDto, { nullable: true })
  expectedSalePrice!: ShowcasePriceDto;

  @Field(() => ShowcaseInventoryDto, { nullable: true })
  inventory!: ShowcaseInventoryDto;

  @FilterableField(() => Number, { nullable: true })
  commentCount: number;
  @FilterableField(() => Number, { nullable: true })
  preorderCount: number;
  @FilterableField(() => Number, { nullable: false })
  viewCount: number;

  get isPublished() {
    return this.publishStatus === PublishStatus.PUBLISHED;
  }

  isCreatedBy(user: AuthDto) {
    return this.authorUid === user.uid;
  }
}
