import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { MediaEntity } from '../../media/media.entity';
import { ShowcaseHFEntity } from './showcaseHF.entity';

@ChildEntity()
export class ShowcaseHFMediaEntity extends MediaEntity {
  @OneToOne(() => ShowcaseHFEntity, (hf) => hf.image, {
    nullable: true,
  })
  @JoinColumn({ name: 'hfId' })
  hf!: ShowcaseHFEntity;
}
