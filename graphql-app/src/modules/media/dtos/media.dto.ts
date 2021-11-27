import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IdInterface } from '../../../gql/interfaces/id.interface';

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

  @Field()
  type: string;
}
