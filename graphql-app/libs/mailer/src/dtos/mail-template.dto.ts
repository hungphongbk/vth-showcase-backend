import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';

@ObjectType()
export class MailTemplateDto {
  @IDField(() => String)
  id: string;

  @FilterableField()
  name: string;

  @Field()
  subject: string;

  @Field({ nullable: true })
  html: string;

  @Field({ nullable: true })
  _serializedNode: string;
}
