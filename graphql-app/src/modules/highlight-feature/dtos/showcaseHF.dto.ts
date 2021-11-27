import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { ShowcaseDto } from '../../showcase/dtos/showcase.dtos';
import { MediaDto } from '../../media/dtos/media.dto';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class ShowcaseHFBaseDto {
  @FilterableField()
  name: string;

  @Field()
  description: string;
}

@ObjectType('ShowcaseHighlightFeature')
@Relation('image', () => MediaDto)
@Relation('showcase', () => ShowcaseDto)
export class ShowcaseHFDto extends ShowcaseHFBaseDto {
  @FilterableField(() => ID)
  id: string;
}
