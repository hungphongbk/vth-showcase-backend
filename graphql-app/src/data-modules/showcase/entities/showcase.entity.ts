import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PublishStatus, ShowcaseStatus } from '../dtos/showcase.dtos';
import slugify from 'slugify';
import { IShowcasePrice } from '../interfaces/IShowcasePrice';
import { IShowcaseBrand } from '../interfaces/IShowcaseBrand';
import { ShowcaseMediaEntity } from './showcase.media.entity';
import { ShowcaseHFEntity } from '../../highlight-feature/entities/showcaseHF.entity';
import { ImageListEntity } from '../../image-list/entities/image-list.entity';
import * as crypto from 'crypto';
import { IShowcaseInventory } from '../interfaces/IShowcaseInventory';
import { InvestmentPackageEntity } from '../../investment/investment.package.entity';
import { CommentEntity } from '../../comment/comment.entity';
import { AuthoredContentEntity } from '../../../auth';

@Entity('showcase')
export class ShowcaseEntity extends AuthoredContentEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column({ type: 'jsonb' })
  brand: IShowcaseBrand;

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
    type: 'text',
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date', nullable: true })
  expectedSaleAt!: Date | null;

  @Column({ type: 'date', nullable: true })
  expectedSaleEndAt!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  expectedQuantity!: IShowcasePrice;

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

  @Column({ type: 'jsonb', nullable: true })
  inventory: IShowcaseInventory;

  @ManyToMany(() => InvestmentPackageEntity)
  @JoinTable()
  availableInvestmentPackages: InvestmentPackageEntity[];

  @OneToMany(() => CommentEntity, (obj) => obj.showcase, {
    eager: true,
    cascade: true,
  })
  comments: CommentEntity[];

  @BeforeInsert()
  async generateSlug() {
    const currentTs = new Date().valueOf().toString();
    const id = crypto
      .createHash('sha1')
      .update(currentTs)
      .digest('hex')
      .slice(0, 8)
      .toUpperCase();
    this.slug = `${slugify(this.name, {
      lower: true,
    })}-${id}`;
  }
}
