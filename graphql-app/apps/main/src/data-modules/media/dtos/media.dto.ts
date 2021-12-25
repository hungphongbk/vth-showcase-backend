import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IdInterface } from '../../../gql/interfaces/id.interface';
import { MediaType } from '../media.entity';

registerEnumType(MediaType, {
  name: 'MediaType',
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

  @Field({ nullable: true })
  preloadUrl: string;

  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;
}
