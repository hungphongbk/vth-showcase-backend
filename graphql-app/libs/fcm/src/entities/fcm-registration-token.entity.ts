import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fcm-registration-token')
export class FcmRegistrationTokenEntity {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column()
  @Index()
  token: string;

  @Column()
  @Index()
  topic: string;

  @Column()
  @Index()
  authorUid: string;

  @CreateDateColumn()
  createdAt: Date;
}
