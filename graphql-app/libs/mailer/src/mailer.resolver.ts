import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { MailDto } from '@app/mailer/dtos/mail.dto';
import {
  Args,
  InputType,
  Mutation,
  PartialType,
  Resolver,
} from '@nestjs/graphql';

@InputType()
class MailCreateDto extends PartialType(MailDto, InputType) {}

@Resolver(() => MailDto)
export class MailerResolver {
  constructor(
    @InjectQueryService(MailDto)
    private readonly mailQueryService: QueryService<MailDto>,
  ) {}

  @Mutation(() => MailDto)
  async sendEmail(@Args('input') input: MailCreateDto) {
    return await this.mailQueryService.createOne(input);
  }
}
