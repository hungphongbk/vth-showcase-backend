import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { MediaEntity, MediaType } from '../../media/media.entity';
import { ShowcaseHFEntity } from './showcaseHF.entity';

@ChildEntity(MediaType.HF)
export class ShowcaseHFMediaEntity extends MediaEntity {
  @OneToOne(() => ShowcaseHFEntity, (hf) => hf.image, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  hf!: ShowcaseHFEntity;

  hfId: number;
}
