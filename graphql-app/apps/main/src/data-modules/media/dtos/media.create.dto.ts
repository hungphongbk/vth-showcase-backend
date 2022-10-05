import { Field, InputType } from '@nestjs/graphql';
import { MediaType } from '../media.entity';
import { MediaFormatType } from '../media.enums';

@InputType('MediaInput')
export class MediaCreateDto {
  @Field({ nullable: false })
  filename: string;

  @Field({ nullable: false })
  path: string;

  @Field({ nullable: false })
  mimetype: string;

  @Field({ nullable: true })
  preloadUrl: string;

  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;

  @Field(() => MediaType, { nullable: true })
  type: MediaType;

  @Field(() => MediaFormatType, {
    nullable: true,
    defaultValue: MediaFormatType.IMAGE,
  })
  formatType: MediaFormatType;
}
