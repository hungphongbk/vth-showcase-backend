import { MediaModel } from '../../media/media.model';
import { Field, InterfaceType } from '@nestjs/graphql';
import { JoinColumn, OneToOne } from 'typeorm';

@InterfaceType()
export abstract class MediaInterface {
  @OneToOne(() => MediaModel, { nullable: false, eager: true })
  @JoinColumn()
  @Field({ nullable: false })
  image!: MediaModel;
}
