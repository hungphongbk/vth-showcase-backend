import { Args, ArgsType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '@app/auth/guards/gql.auth.guard';
import { AuthDto, AuthRoleType } from '@app/auth/dtos/auth.dto';
import { AuthQueryService } from '@app/auth/services/auth.query.service';
import {
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { AuthCreateDto } from '@app/auth/dtos/auth-create-dto';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { generate } from 'generate-password';
import { MailerService } from '@app/mailer';

@ArgsType()
class CO extends MutationArgsType(AuthCreateDto) {}

@Resolver()
@UseGuards(GqlAdminAuthGuard)
export class AuthAdminResolver {
  constructor(
    private readonly userQueryService: AuthQueryService,
    private readonly mailService: MailerService,
  ) {}

  @Query(() => [AuthDto])
  async getAllUsers() {
    return await this.userQueryService.query({});
  }

  @Query(() => AuthDto)
  async getOneUser(@Args('uid') uid: string) {
    return await this.userQueryService.getById(uid);
  }

  @Mutation(() => Boolean)
  async updateOneUser(
    @Args('uid') uid: string,
    @Args({ name: 'role', type: () => AuthRoleType }) role: AuthRoleType,
  ) {
    await this.userQueryService.updateOne(uid, { role });
  }

  @ResolverMutation(() => AuthDto, {
    name: 'createOneUserDto',
  })
  async createOne(@MutationHookArgs() input: CO): Promise<AuthDto> {
    if (!input.input.password) {
      input.input.password = generate({
        length: 10,
        numbers: true,
      });
    }
    const dto = await this.userQueryService.createOne(input.input);
    await this.mailService.send<AuthCreateDto>(
      input.input.email,
      'new-admin-notify',
      input.input,
    );
    return dto;
  }
}
