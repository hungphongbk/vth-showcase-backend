import { QueryService, RelationQueryService } from '@nestjs-query/core';
import { PreorderDto } from './dtos/preorder.dto';
import { InjectAuthoredQueryService } from '../../auth';
import { PreorderEntity } from './entities/preorder.entity';

export class PreorderQueryService extends RelationQueryService<PreorderDto> {
  constructor(
    @InjectAuthoredQueryService(PreorderEntity)
    preorderService: QueryService<PreorderDto>,
  ) {
    super(preorderService, {});
  }
}
