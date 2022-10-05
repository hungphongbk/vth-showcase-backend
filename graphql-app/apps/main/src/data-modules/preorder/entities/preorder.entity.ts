import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShowcaseEntity } from '../../showcase/entities/showcase.entity';

@Entity('preorder')
export class PreorderEntity {
  @Column()
  @Index()
  authorUid!: string;

  @PrimaryGeneratedColumn('identity')
  id: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => ShowcaseEntity, (obj) => obj.preorders, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  showcase!: ShowcaseEntity;
}
