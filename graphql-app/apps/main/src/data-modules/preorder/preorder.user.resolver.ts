import { ArgsType, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthDto } from '../../auth';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { PreorderEntity } from './entities/preorder.entity';
import { PreorderDto } from './dtos/preorder.dto';
import { QueryArgsType } from '@nestjs-query/query-graphql';

@ArgsType()
class PreorderDtoQuery extends QueryArgsType(PreorderDto) {}
const PreorderConnection = PreorderDtoQuery.ConnectionType;

@Resolver(() => AuthDto)
export class PreorderUserResolver {
  constructor(
    @InjectQueryService(PreorderEntity)
    private readonly service: QueryService<PreorderDto>,
  ) {}

  @ResolveField('preorders', () => PreorderConnection)
  preorders(@Parent() user: AuthDto) {
    return PreorderConnection.createFromPromise(this.service.query, {
      filter: { authorUid: { eq: user.uid } },
      paging: { limit: 10 },
    });
  }
}
