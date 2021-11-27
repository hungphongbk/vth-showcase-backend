import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { MediaEntity } from '../../media/media.entity';
import { ShowcaseDto } from '../../showcase/dtos/showcase.dtos';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class ShowcaseHFBaseDto {
  @FilterableField()
  name: string;

  @Field()
  description: string;
}

@ObjectType('ShowcaseHighlightFeature')
@Relation('image', () => MediaEntity)
@Relation('showcase', () => ShowcaseDto)
export class ShowcaseHFDto extends ShowcaseHFBaseDto {
  @FilterableField(() => ID)
  id: string;
}
