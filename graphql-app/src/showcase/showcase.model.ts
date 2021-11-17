import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MediaModel } from '../media/media.model';

export enum ShowcaseStatus {
  COMING = 'coming soon',
  IDEA = 'idea',
  SHOWCASE = 'showcase',
}

registerEnumType(ShowcaseStatus, {
  name: 'ShowcaseStatus',
});

@Entity('showcase')
@ObjectType()
export class ShowcaseModel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: number;

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

  @OneToOne(() => MediaModel)
  @JoinColumn()
  image: MediaModel;
}
