import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm';
import { MediaEntity } from '../../media/media.entity';
import { ImageListEntity } from './image-list.entity';

@ChildEntity()
export class ImageListMediaEntity extends MediaEntity {
  @ManyToOne(() => ImageListEntity, (obj) => obj.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  list!: ImageListEntity;
}
