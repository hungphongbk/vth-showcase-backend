import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BrandMediaEntity } from './brand-media.entity';

@Entity({ name: 'brand' })
export class BrandEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => BrandMediaEntity, (obj) => obj.brand, {
    eager: true,
    cascade: true,
  })
  mediaList: BrandMediaEntity;

  @Column({ type: 'json', nullable: true })
  metadata: any;
}
