import { Field, InputType } from '@nestjs/graphql';

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
}
