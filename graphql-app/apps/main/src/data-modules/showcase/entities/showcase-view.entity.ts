import { ViewEntity } from 'typeorm';
import { CommentEntity } from '../../comment/comment.entity';
import { ShowcaseEntity } from './showcase.entity';
import { PreorderEntity } from '../../preorder/entities/preorder.entity';

@ViewEntity({
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .select('*')
      .from(ShowcaseEntity, 'showcase')
      .addSelect(
        (qb) =>
          qb
            .select('count(comment.id)', 'commentCount')
            .from(CommentEntity, 'comment')
            .where('comment.showcaseId = showcase.id'),
        'commentCount',
      )
      .addSelect((qb) =>
        qb
          .select('count(preorder.id)', 'preorderCount')
          .from(PreorderEntity, 'preorder')
          .where('preorder.showcaseId = showcase.id'),
      ),
})
export class ShowcaseViewEntity {}
