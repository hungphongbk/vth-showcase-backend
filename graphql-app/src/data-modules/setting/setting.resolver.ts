import { Args, ArgsType, Query, Resolver } from '@nestjs/graphql';
import { SettingDto } from './dtos/setting.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { SettingEntity } from './setting.entity';
import {
  MutationArgsType,
  MutationHookArgs,
  QueryArgsType,
} from '@nestjs-query/query-graphql';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { SettingCreateDto } from './dtos/setting.create.dto';

@ArgsType()
class SettingQuery extends QueryArgsType(SettingDto) {}

@ArgsType()
class CreateOneSetting extends MutationArgsType(SettingCreateDto) {}

@Resolver(() => SettingDto)
export class SettingResolver {
  constructor(
    @InjectQueryService(SettingEntity)
    private readonly service: QueryService<SettingDto>,
  ) {}

  @Query(() => SettingDto)
  async setting(@Args('key') key: string): Promise<SettingDto | undefined> {
    return (await this.service.query({ filter: { key: { eq: key } } }))[0];
  }

  @Query(() => [SettingDto])
  async settings(
    @Args('keys', { type: () => [String] }) keys: string[],
  ): Promise<SettingDto[]> {
    return await this.service.query({ filter: { key: { in: keys } } });
  }

  @ResolverMutation(() => Boolean)
  async createOneSetting(@MutationHookArgs() input: CreateOneSetting) {
    await this.service.createOne(input.input);
    return true;
  }

  @ResolverMutation(() => Boolean)
  async updateOneSetting(@MutationHookArgs() input: CreateOneSetting) {
    await this.service.updateMany(
      { value: input.input.value },
      { key: { eq: input.input.key } },
    );
    return true;
  }
}
