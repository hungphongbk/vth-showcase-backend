import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { MediaFormatType } from './media.enums';

export enum MediaType {
  SHOWCASE,
  HF,
  IMGLIST,
  BRAND,
}

@Entity('media')
@TableInheritance({ column: { type: 'enum', enum: MediaType, name: 'type' } })
export class MediaEntity {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  preloadUrl: string;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  type?: MediaType;

  @Column({
    type: 'enum',
    enum: MediaFormatType,
    default: MediaFormatType.IMAGE,
  })
  formatType: MediaFormatType;
}
