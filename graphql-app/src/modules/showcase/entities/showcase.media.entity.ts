import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { MediaEntity } from '../../media/media.entity';
import { ShowcaseEntity } from './showcase.entity';

@ChildEntity()
export class ShowcaseMediaEntity extends MediaEntity {
  @OneToOne(() => ShowcaseEntity, (showcase) => showcase.image, {
    nullable: true,
  })
  @JoinColumn()
  showcase!: ShowcaseEntity;
}
