import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ShowcaseDto } from '../data-modules/showcase/dtos/showcase.dtos';
import { ShowcaseEntity } from '../data-modules/showcase/entities/showcase.entity';

@ObjectType('User')
@Entity('user')
export class AuthModel {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  @FilterableField(() => ID)
  uid: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => ShowcaseEntity, (obj) => obj.author)
  showcasePosts: ShowcaseDto[];

  @Column()
  @FilterableField()
  email: string;
}
