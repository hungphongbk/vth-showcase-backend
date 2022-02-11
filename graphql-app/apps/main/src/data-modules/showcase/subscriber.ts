import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { ShowcaseEntity } from './entities/showcase.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { FcmService } from '@app/fcm';

@EventSubscriber()
export class ShowcaseSubscriber
  implements EntitySubscriberInterface<ShowcaseEntity>
{
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly fcm: FcmService,
  ) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return ShowcaseEntity;
  }

  async afterUpdate({
    updatedColumns,
    entity,
  }: UpdateEvent<ShowcaseEntity>): Promise<void> {
    if (updatedColumns.some((col) => col.propertyName === 'slug')) {
      await this.fcm.sendToTopic(
        `preorder:${entity.slug}`,
        {
          notification: {
            title: 'Cập nhật tình trạng dự án',
            body: `Sản phẩm "${entity.name}" đã được cập nhật trạng thái là "${
              entity.status as string
            }"`,
          },
        },
        false,
      );
    }
  }
}
