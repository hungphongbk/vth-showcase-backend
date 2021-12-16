import {
  Args,
  ArgsType,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ShowcaseDto } from '../dtos/showcase.dtos';
import { Logger, UseGuards } from '@nestjs/common';
import {
  AuthDto,
  AuthQueryService,
  CurrentUser,
  GqlAuthGuard,
} from '../../../auth';
import { ShowcaseQueryService } from '../showcase.queryService';
import {
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { ShowcaseCreateInputDto } from '../dtos/showcase.create.dto';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { UserStatusEnum } from '../dtos/user-status.enum';

@ArgsType()
class CreateOneShowcase extends MutationArgsType(ShowcaseCreateInputDto) {}

@Resolver(() => ShowcaseDto)
@UseGuards(GqlAuthGuard)
export class ShowcaseAuthResolver {
  private readonly logger = new Logger(ShowcaseAuthResolver.name);
  constructor(
    private readonly service: ShowcaseQueryService,
    private readonly authQueryService: AuthQueryService,
  ) {}

  @ResolverMutation(() => ShowcaseDto)
  async createOneShowcase(
    @MutationHookArgs() input: CreateOneShowcase,
    @CurrentUser() user: AuthDto,
  ) {
    const showcase = await this.service.createOne(input.input);
    showcase.authorUid = user.uid;
    return showcase;
  }

  @ResolverMutation(() => Boolean)
  async updateOneShowcase(
    @Args('slug') slug: string,
    @MutationHookArgs() input: CreateOneShowcase,
    // @GqlCurrentUser() user: AuthDto,
  ) {
    await this.service.updateMany(input.input, { slug: { eq: slug } });
    return true;
  }

  @Mutation(() => Boolean)
  async deleteOneShowcase(@Args('slug') slug: string) {
    this.logger.log(`deleteOneShowcase: deleting showcase ${slug}`);
    await this.service.deleteMany({
      slug: { eq: slug },
    });
    this.logger.log('deleteOneShowcase: Successfully');
    return true;
  }
}

@Resolver(() => AuthDto)
export class ShowcaseAuthAugmentResolver {
  constructor(
    private readonly service: ShowcaseQueryService,
    private readonly authQueryService: AuthQueryService,
  ) {}

  @ResolveField('approvalStatus', () => UserStatusEnum)
  async approvalStatus(@Parent() user: AuthDto) {
    return UserStatusEnum.APPROVED_CREATOR;
  }
}
