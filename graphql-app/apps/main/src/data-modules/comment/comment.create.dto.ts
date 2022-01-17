import { Field, InputType } from '@nestjs/graphql';
import { CommentRateEnum } from './comment.enum';

@InputType()
export class CommentCreateDto {
  @Field({ nullable: true })
  isTopComment?: boolean;

  @Field()
  content: string;

  @Field(() => [CommentRateEnum])
  rate!: CommentRateEnum[];
}
