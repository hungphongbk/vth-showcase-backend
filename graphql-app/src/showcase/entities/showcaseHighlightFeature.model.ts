import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MediaInterface } from '../../gql/interfaces/media.interface';
import { IdInterface } from '../../gql/interfaces/id.interface';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { MediaModel } from '../../media/media.model';
import { ShowcaseEntity } from './showcase.entity';
import { ShowcaseDto } from '../dtos/showcase.dtos';

@Entity('showcaseHighlightFeature')
@ObjectType('ShowcaseHighlightFeature', {
  implements: () => [MediaInterface, IdInterface],
})
@Relation('image', () => MediaModel)
@Relation('showcase', () => ShowcaseDto)
export class ShowcaseHighlightFeatureModel
  implements MediaInterface, IdInterface
{
  @Column()
  @Field()
  description: string;

  @Column({ nullable: false })
  @Field()
  name: string;

  @PrimaryGeneratedColumn('identity')
  @FilterableField(() => ID)
  id: string;

  @ManyToOne(() => ShowcaseEntity, (entity) => entity.highlightFeatures)
  @Field(() => ShowcaseDto, { nullable: false })
  showcase!: ShowcaseEntity;

  @OneToOne(() => MediaModel, { nullable: false, eager: true })
  @JoinColumn()
  image!: MediaModel;
}
