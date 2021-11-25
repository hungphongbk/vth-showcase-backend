import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { MediaEntity } from '../media/media.entity';
import { ShowcaseStatus } from './dtos/showcase.dtos';
import slugify from 'slugify';
import { IShowcasePrice } from './interfaces/IShowcasePrice';
import { IShowcaseBrand } from './interfaces/IShowcaseBrand';
import { IShowcase } from './interfaces/IShowcase';

@Entity('showcase')
export class ShowcaseEntity implements IShowcase {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  author: string;

  @Column({ type: 'jsonb' })
  brand: IShowcaseBrand;

  @Column({
    type: 'enum',
    enum: ShowcaseStatus,
    default: ShowcaseStatus.SHOWCASE,
  })
  status: ShowcaseStatus;

  @Column({
    type: 'text',
  })
  description: string;

  @OneToOne(() => MediaEntity, { nullable: false, eager: true })
  @JoinColumn()
  image: MediaEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date', nullable: true })
  expectedSaleAt!: Date | null;

  @Column({ type: 'integer' })
  expectedQuantity!: number;

  @Column({ type: 'jsonb' })
  expectedSalePrice: IShowcasePrice;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeSave() {
    this.slug = slugify(this.name, {
      lower: true,
    });
  }
}

@ObjectType()
export class ShowcasePreviewDto extends ShowcaseEntity {
  @Field(() => [ShowcaseEntity], { nullable: false })
  relatedShowcases: ShowcaseEntity[];
}
