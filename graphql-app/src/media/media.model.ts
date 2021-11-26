import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MediaDto } from './media.dto';
import { IdInterface } from '../gql/interfaces/id.interface';
import { FilterableField } from '@nestjs-query/query-graphql';

@Entity('media')
@ObjectType('Media', { implements: () => [IdInterface] })
export class MediaModel implements MediaDto, IdInterface {
  @PrimaryGeneratedColumn('identity')
  @FilterableField(() => ID)
  public id: string;

  @Column()
  @Field({ nullable: false })
  filename: string;

  @Column()
  @Field({ nullable: false })
  path: string;

  @Column()
  @Field({ nullable: false })
  mimetype: string;
}
