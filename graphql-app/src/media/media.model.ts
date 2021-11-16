import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MediaDto } from './media.dto';

@Entity('media')
@ObjectType()
export class MediaModel implements MediaDto {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  public id: number;

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
