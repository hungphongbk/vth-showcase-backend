import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

export enum MediaType {
  SHOWCASE,
  HF,
  IMGLIST,
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
}
