import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm';
import { MediaEntity, MediaType } from '../media/media.entity';
import { BrandEntity } from './brand.entity';

@ChildEntity(MediaType.BRAND)
export class BrandMediaEntity extends MediaEntity {
  @ManyToOne(() => BrandEntity, (obj) => obj.mediaList, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  brand!: BrandEntity;
}
