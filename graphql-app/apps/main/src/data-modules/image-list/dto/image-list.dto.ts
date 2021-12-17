import { ID, ObjectType } from '@nestjs/graphql';
import { IdInterface } from '../../../gql/interfaces/id.interface';
import { FilterableField, UnPagedRelation } from '@nestjs-query/query-graphql';
import { MediaDto } from '../../media/dtos/media.dto';

@ObjectType('ImageList', {
  implements: [IdInterface],
})
@UnPagedRelation('images', () => MediaDto)
export class ImageListDto implements IdInterface {
  @FilterableField(() => ID)
  id: string;
}
