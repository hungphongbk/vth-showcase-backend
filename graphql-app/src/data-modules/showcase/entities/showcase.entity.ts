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
import { ImageListEntity } from '../../image-list/entities/image-list.entity';

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

  @Column({ type: 'jsonb', nullable: true })
  expectedSalePrice: IShowcasePrice;

  @OneToOne(() => ShowcaseMediaEntity, (media) => media.showcase, {
    eager: true,
    cascade: true,
  })
  image!: ShowcaseMediaEntity;

  /**
   * FROM THIS SECTION EVERYTHING SHOULD BE NORMALIZED INTO CONTENT
   */

  @OneToMany(() => ShowcaseHFEntity, (feat) => feat.showcase, {
    eager: true,
    cascade: true,
  })
  highlightFeatures!: ShowcaseHFEntity[];

  @OneToMany(() => ImageListEntity, (obj) => obj.showcase, {
    eager: true,
    cascade: true,
  })
  imageLists!: ImageListEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async beforeSave() {
    // Logger.log(JSON.stringify(this));
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
