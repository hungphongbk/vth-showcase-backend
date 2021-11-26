import { MediaModel } from '../../media/media.model';
import { Field, InterfaceType } from '@nestjs/graphql';
import { JoinColumn, OneToOne } from 'typeorm';

@InterfaceType()
export abstract class MediaInterface {
  @OneToOne(() => MediaModel, { eager: true })
  @JoinColumn()
  @Field(() => MediaModel, { nullable: false })
  image!: MediaModel;
}
