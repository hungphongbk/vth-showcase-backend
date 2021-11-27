import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity('media')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
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
