import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MediaModel } from '../media/media.model';
import { ShowcaseDto, ShowcaseStatus } from './showcase.dtos';

@Entity('showcase')
@ObjectType()
export class ShowcaseModel implements ShowcaseDto {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field({ nullable: false })
  author: string;

  @Column({
    type: 'enum',
    enum: ShowcaseStatus,
    default: ShowcaseStatus.SHOWCASE,
  })
  @Field(() => ShowcaseStatus)
  status: ShowcaseStatus;

  @Column({
    type: 'text',
  })
  @Field()
  description: string;

  @OneToOne(() => MediaModel, { nullable: false, eager: true })
  @JoinColumn()
  @Field({ nullable: false })
  image: MediaModel;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class ShowcasePreviewDto extends ShowcaseModel {
  @Field(() => [ShowcaseModel], { nullable: false })
  relatedShowcases: ShowcaseModel[];
}
