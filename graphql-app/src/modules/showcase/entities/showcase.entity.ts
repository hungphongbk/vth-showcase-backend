import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { ShowcaseStatus } from '../dtos/showcase.dtos';
import slugify from 'slugify';
import { IShowcasePrice } from '../interfaces/IShowcasePrice';
import { IShowcaseBrand } from '../interfaces/IShowcaseBrand';
import { ShowcaseMediaEntity } from './showcase.media.entity';
import { ShowcaseHFEntity } from '../../highlight-feature/entities/showcaseHF.entity';

@Entity('showcase')
export class ShowcaseEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  @Index()
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

  @OneToOne(() => ShowcaseMediaEntity, (media) => media.showcase, {
    eager: true,
    cascade: true,
  })
  image!: ShowcaseMediaEntity;

  @OneToMany(() => ShowcaseHFEntity, (feat) => feat.showcase, { eager: true })
  highlightFeatures!: ShowcaseHFEntity[];

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
