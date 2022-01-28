import {
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { InvestorRegistrationDto } from '@app/investor/dtos/investor-registration.dto';
import { InvestorRegistrationCreateDto } from '@app/investor/dtos/investor-registration.create.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ArgsType, Resolver } from '@nestjs/graphql';
import { MailerService } from '@app/mailer';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';

@ArgsType()
class CO extends MutationArgsType(InvestorRegistrationCreateDto) {}

@Resolver()
export class InvestorCreateResolver {
  constructor(
    @InjectQueryService(InvestorRegistrationDto)
    private readonly service: QueryService<
      InvestorRegistrationDto,
      InvestorRegistrationCreateDto
    >,
    private readonly mailService: MailerService,
  ) {}

  @ResolverMutation(() => InvestorRegistrationDto, {
    name: 'createOneInvestorRegistrationDto',
  })
  async createOne(
    @MutationHookArgs() input: CO,
  ): Promise<InvestorRegistrationDto> {
    const dto = await this.service.createOne(input.input);
    console.log(dto);
    await this.mailService.send<InvestorRegistrationDto>(
      input.input.email,
      'investor-reg-notify',
      dto,
    );
    return dto;
  }
}
