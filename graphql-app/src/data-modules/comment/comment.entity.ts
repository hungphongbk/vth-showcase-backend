import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowcaseEntity } from '../showcase/entities/showcase.entity';
import { AuthoredContentEntity } from '../../auth/authored.content.entity';

export enum CommentRateEnum {
  SIEU_PHAM = 'sieu-pham',
  CO_TIEM_NANG = 'co-tiem-nang',
  DANG_TIEN = 'dang-tien',
  HAY = 'hay',
  CUNG_DUOC = 'cung-duoc',
  XAM_XI = 'xam-xi',
}

@Entity('comment')
export class CommentEntity extends AuthoredContentEntity('comments') {
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
