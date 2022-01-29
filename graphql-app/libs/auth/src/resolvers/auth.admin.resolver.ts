import { Args, ArgsType, Query, Resolver } from '@nestjs/graphql';
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
import { SortDirection } from '@nestjs-query/core';
import { AuthUpdateDto } from '@app/auth/dtos/auth-update.dto';

@ArgsType()
class CO extends MutationArgsType(AuthCreateDto) {}

@ArgsType()
class UO extends MutationArgsType(AuthUpdateDto) {}

@Resolver()
@UseGuards(GqlAdminAuthGuard)
export class AuthAdminResolver {
  constructor(
    private readonly userQueryService: AuthQueryService,
    private readonly mailService: MailerService,
  ) {}

  @Query(() => [AuthDto])
  async getAllUsers() {
    return await this.userQueryService.query({
      sorting: [{ field: 'createdAt', direction: SortDirection.DESC }],
    });
  }

  @Query(() => AuthDto)
  async getOneUser(@Args('uid') uid: string) {
    return await this.userQueryService.getById(uid);
  }

  @ResolverMutation(() => Boolean, {
    name: 'updateOneUser',
  })
  async updateOneUser(@Args('uid') uid: string, @MutationHookArgs() input: UO) {
    const dto = await this.userQueryService.updateOne(uid, input.input);
    if (input.input.role === AuthRoleType.ADMIN) {
      await this.mailService.send<AuthCreateDto>(
        dto.email,
        'new-admin-notify',
        { ...input.input, email: dto.email },
      );
    }
    return true;
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
