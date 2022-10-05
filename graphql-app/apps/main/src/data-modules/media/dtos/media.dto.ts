import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IdInterface } from '../../../gql/interfaces/id.interface';
import { MediaType } from '../media.entity';
import { MediaFormatType } from '../media.enums';

registerEnumType(MediaType, {
  name: 'MediaType',
});
registerEnumType(MediaFormatType, {
  name: 'MediaFormatType',
});

@ObjectType({
  implements: () => [IdInterface],
})
export class MediaDto {
  @IDField(() => ID)
  id: string;

  @FilterableField({ nullable: false })
  filename: string;

  @Field({ nullable: false })
  path: string;

  @Field({ nullable: false })
  mimetype: string;

  @Field(() => MediaType)
  type: MediaType;

  @Field()
  preloadUrl: string;

  @Field()
  width: number;

  @Field()
  height: number;

  @Field(() => MediaFormatType, { nullable: false })
  formatType: MediaFormatType;
}
