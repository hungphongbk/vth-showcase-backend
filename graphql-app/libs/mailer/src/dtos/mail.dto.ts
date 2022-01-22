import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import JSON from 'graphql-type-json';

@ObjectType({
  isAbstract: true,
})
@InputType('MailTemplateSpecInputDto', { isAbstract: true })
class MailTemplateSpecDto {
  @Field()
  name: string;

  @Field(() => JSON)
  data: any;
}

@ObjectType()
export class MailDto {
  @IDField(() => ID)
  id: string;

  @FilterableField(() => [String])
  to: string[];

  @Field(() => MailTemplateSpecDto)
  template: MailTemplateSpecDto;
}
