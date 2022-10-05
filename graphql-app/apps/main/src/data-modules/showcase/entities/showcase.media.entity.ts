import { ChildEntity, Column, Index, JoinColumn, OneToOne } from 'typeorm';
import { MediaEntity, MediaType } from '../../media/media.entity';
import { ShowcaseEntity } from './showcase.entity';

@ChildEntity(MediaType.SHOWCASE)
// @Index(['showcaseId'])
export class ShowcaseMediaEntity extends MediaEntity {
  @OneToOne(() => ShowcaseEntity, (showcase) => showcase.image, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  showcase!: ShowcaseEntity;

  @Column()
  @Index()
  showcaseId: number;
}
