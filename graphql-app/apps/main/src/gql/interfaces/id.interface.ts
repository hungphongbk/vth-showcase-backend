import { ID, InterfaceType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@InterfaceType()
export abstract class IdInterface {
  @FilterableField(() => ID)
  id: string;
}
