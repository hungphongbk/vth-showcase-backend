import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm';
import { MediaEntity, MediaType } from '../../media/media.entity';
import { ImageListEntity } from './image-list.entity';

@ChildEntity(MediaType.IMGLIST)
export class ImageListMediaEntity extends MediaEntity {
  @ManyToOne(() => ImageListEntity, (obj) => obj.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  list!: ImageListEntity;
}
