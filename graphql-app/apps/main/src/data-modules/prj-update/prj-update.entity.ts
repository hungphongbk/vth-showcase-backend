import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShowcaseEntity } from '../showcase/entities/showcase.entity';

@Entity('PrjUpdate')
export class PrjUpdateEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => ShowcaseEntity, (obj) => obj.updates, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  showcase!: ShowcaseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  content: string;
}
