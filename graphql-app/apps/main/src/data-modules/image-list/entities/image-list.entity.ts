import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageListMediaEntity } from './image-list.media.entity';
import { ShowcaseEntity } from '../../showcase/entities/showcase.entity';

@Entity('imageList')
export class ImageListEntity {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @OneToMany(() => ImageListMediaEntity, (obj) => obj.list, {
    eager: true,
    cascade: true,
  })
  images: ImageListMediaEntity[];

  @ManyToOne(() => ShowcaseEntity, (obj) => obj.imageLists, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  showcase: ShowcaseEntity;
}
