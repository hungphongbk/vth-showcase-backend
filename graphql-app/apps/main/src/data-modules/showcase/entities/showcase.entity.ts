import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PublishStatus, ShowcaseStatus } from '../dtos/showcase.dto';
import { ShowcasePriceInterface } from '../interfaces/showcase-price.interface';
import { ShowcaseMediaEntity } from './showcase.media.entity';
import { ShowcaseHFEntity } from '../../highlight-feature/entities/showcaseHF.entity';
import { ImageListEntity } from '../../image-list/entities/image-list.entity';
import { ShowcaseInventoryInterface } from '../interfaces/showcase-inventory.interface';
import { CommentEntity } from '../../comment/comment.entity';
import { PrjUpdateEntity } from '../../prj-update/prj-update.entity';
import { PreorderEntity } from '../../preorder/entities/preorder.entity';
import { ShowcaseInterface } from '../interfaces/showcase.interface';
import { slugify } from '@app/util';
// noinspection ES6PreferShortImport
import { BrandEntity } from '../../brand/brand.entity';
// noinspection ES6PreferShortImport
import { ShowcaseInvestPkgEntity } from '../../showcase-invest-pkg/showcase-invest-pkg.entity';

@Entity('showcase')
export class ShowcaseEntity implements ShowcaseInterface {
  @Column({ nullable: false })
  @Index()
  authorUid!: string;
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @ManyToOne(() => BrandEntity, (obj) => obj.showcases, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  brand: BrandEntity;

  @Column({
    type: 'enum',
    enum: ShowcaseStatus,
    default: ShowcaseStatus.SHOWCASE,
  })
  status!: ShowcaseStatus;

  @Column({
    type: 'enum',
    enum: PublishStatus,
    default: PublishStatus.DRAFT,
  })
  publishStatus!: PublishStatus;

  @Column({
    default: false,
  })
  isFeatured: boolean;

  @Column({
    type: 'text',
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  expectedSaleAt!: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  expectedSaleEndAt!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  expectedQuantity!: ShowcasePriceInterface;

  @Column({ type: 'jsonb', nullable: true })
  expectedSalePrice: ShowcasePriceInterface;

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

  @Column({ type: 'jsonb', nullable: true })
  inventory: ShowcaseInventoryInterface;

  @OneToMany(() => CommentEntity, (obj) => obj.showcase, {
    eager: true,
    cascade: true,
  })
  comments: CommentEntity[];

  @OneToMany(() => PrjUpdateEntity, (obj) => obj.showcase, {
    eager: true,
    cascade: true,
  })
  updates: PrjUpdateEntity[];

  @OneToMany(() => PreorderEntity, (obj) => obj.showcase, {
    eager: true,
    cascade: true,
  })
  preorders: PreorderEntity[];

  @Column({ default: 0 })
  viewCount: number;

  @OneToMany(() => ShowcaseInvestPkgEntity, (rel) => rel.showcase, {
    cascade: true,
    eager: true,
  })
  showcasePkg: ShowcaseInvestPkgEntity;

  @BeforeInsert()
  async generateSlug() {
    if (typeof this.slug !== 'undefined') return;
    this.slug = slugify(this.name, true);
  }
}
