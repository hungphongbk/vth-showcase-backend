import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('setting')
export class SettingEntity {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column({ unique: true, nullable: false })
  @Index({ unique: true })
  key: string;

  @Column({ type: 'json' })
  value: any;

  @UpdateDateColumn()
  updatedAt: Date;
}
