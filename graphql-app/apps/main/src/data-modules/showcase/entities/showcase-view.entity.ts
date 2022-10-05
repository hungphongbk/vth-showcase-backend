import { ViewColumn, ViewEntity } from 'typeorm';
import { CommentEntity } from '../../comment/comment.entity';
import { ShowcaseEntity } from './showcase.entity';
import { PreorderEntity } from '../../preorder/entities/preorder.entity';
import { PublishStatus, ShowcaseStatus } from '../dtos/showcase.dto';
import { ShowcaseInterface } from '../interfaces/showcase.interface';
import { ShowcasePriceInterface } from '../interfaces/showcase-price.interface';
import { ShowcaseInventoryInterface } from '../interfaces/showcase-inventory.interface';

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
export class ShowcaseViewEntity implements ShowcaseInterface {
  @ViewColumn()
  authorUid: string;
  @ViewColumn()
  id: number;
  @ViewColumn()
  slug: string;
  @ViewColumn()
  publishStatus!: PublishStatus;
  @ViewColumn()
  createdAt: Date;
  @ViewColumn()
  description: string;
  @ViewColumn()
  expectedQuantity: ShowcasePriceInterface;
  @ViewColumn()
  expectedSaleAt: Date | null;
  @ViewColumn()
  expectedSaleEndAt: Date | null;
  @ViewColumn()
  expectedSalePrice: ShowcasePriceInterface;
  @ViewColumn()
  inventory: ShowcaseInventoryInterface;
  @ViewColumn()
  isFeatured: boolean;
  @ViewColumn()
  name: string;
  @ViewColumn()
  status: ShowcaseStatus;
  @ViewColumn()
  updatedAt: Date;

  @ViewColumn()
  commentCount: number;
  @ViewColumn()
  preorderCount: number;
  @ViewColumn()
  viewCount: number;
}
