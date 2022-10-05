import { Field, InputType } from '@nestjs/graphql';
import { MediaCreateDto } from '../../media/dtos/media.create.dto';

@InputType()
export class ImageListCreateDto {
  @Field(() => [MediaCreateDto], { nullable: true })
  images: MediaCreateDto[];
}
