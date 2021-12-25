import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowcaseEntity } from '../showcase/entities/showcase.entity';
import { CommentRateEnum } from './comment.enum';

@Entity('comment')
export class CommentEntity {
  @Column()
  @Index()
  authorUid!: string;
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => ShowcaseEntity, (obj) => obj.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  showcase!: ShowcaseEntity;

  @Column()
  content!: string;

  @Column({
    type: 'enum',
    enum: CommentRateEnum,
    array: true,
    default: [],
  })
  rate!: CommentRateEnum[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
