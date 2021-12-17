import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { MediaEntity, MediaType } from '../../media/media.entity';
import { ShowcaseEntity } from './showcase.entity';

@ChildEntity(MediaType.SHOWCASE)
export class ShowcaseMediaEntity extends MediaEntity {
  @OneToOne(() => ShowcaseEntity, (showcase) => showcase.image, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  showcase!: ShowcaseEntity;
}
