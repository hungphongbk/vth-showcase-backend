import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
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
import { ShowcaseHighlightFeatureModel } from './showcaseHighlightFeature.model';
import { MediaModel } from '../../media/media.model';

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

  @OneToOne(() => MediaModel, { eager: true, cascade: true })
  @JoinColumn()
  image!: MediaModel;

  @OneToMany(() => ShowcaseHighlightFeatureModel, (feat) => feat.showcase)
  @JoinColumn()
  highlightFeatures!: ShowcaseHighlightFeatureModel[];

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
