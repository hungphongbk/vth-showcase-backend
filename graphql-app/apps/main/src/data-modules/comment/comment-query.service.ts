import { QueryService, RelationQueryService } from '@nestjs-query/core';
import { CommentDto } from './comment.dto';
import { InjectAuthoredQueryService } from '@app/auth';
import { CommentEntity } from './comment.entity';

export class CommentQueryService extends RelationQueryService<CommentDto> {
  constructor(
    @InjectAuthoredQueryService(CommentEntity)
    commentService: QueryService<CommentDto>,
  ) {
    super(commentService, {});
  }
}
