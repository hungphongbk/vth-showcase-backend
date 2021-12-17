import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShowcaseEntity } from '../../showcase/entities/showcase.entity';
import { ShowcaseHFMediaEntity } from './showcaseHF.media.entity';

@Entity('showcaseHighlightFeature')
export class ShowcaseHFEntity {
  @PrimaryGeneratedColumn('identity')
  id: string;

  /**
   * Name of Highlight feature
   */
  @Column({ nullable: false })
  name: string;

  /**
   * Description of Highlight feature
   */
  @Column()
  description: string;

  /**
   * Showcase that HF belongs to
   */
  @ManyToOne(() => ShowcaseEntity, (entity) => entity.highlightFeatures, {
    // eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  showcase!: ShowcaseEntity;

  @OneToOne(() => ShowcaseHFMediaEntity, (media) => media.hf, {
    eager: true,
    cascade: true,
  })
  image!: ShowcaseHFMediaEntity;
}
