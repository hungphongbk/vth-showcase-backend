import { Field, InputType } from '@nestjs/graphql';
import { CommentRateEnum } from './comment.entity';

@InputType()
export class CommentCreateDto {
  @Field()
  content: string;

  @Field(() => [CommentRateEnum])
  rate!: CommentRateEnum[];
}
