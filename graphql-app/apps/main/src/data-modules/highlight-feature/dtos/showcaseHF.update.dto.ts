import { Field, InputType } from '@nestjs/graphql';
import { MediaCreateDto } from '../../media/dtos/media.create.dto';

@InputType()
export class ShowcaseHFUpdateInputDto {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => MediaCreateDto, { nullable: true })
  image: MediaCreateDto;
}
