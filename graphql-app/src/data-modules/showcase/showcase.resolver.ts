import {
  Args,
  ArgsType,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ShowcaseDto } from './dtos/showcase.dtos';
import { ShowcaseConnection, ShowcaseQuery } from './dtos/query.types';
import {
  ConnectionType,
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { ShowcaseQueryService } from './showcase.queryService';
import { ShowcaseCreateInputDto } from './dtos/showcase.create.dto';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard, GqlOptionalAuthGuard } from '../../auth/gql.auth.guard';
import { GqlCurrentUser } from '../../auth/decorators/current-user.decorator';
import { AuthDto } from '../../auth/dtos/auth.dto';
import { ShowcaseInvestorStatDto } from './dtos/showcase.investor-stat.dto';
import { CacheControlDirective } from '../../gql/directives/cache-control.directive';

@ArgsType()
class CreateOneShowcase extends MutationArgsType(ShowcaseCreateInputDto) {}

@Resolver(() => ShowcaseDto)
@UseGuards(GqlOptionalAuthGuard)
export class ShowcaseResolver {
  private readonly logger = new Logger(ShowcaseResolver.name);
  constructor(private readonly service: ShowcaseQueryService) {}

  @Query(() => ShowcaseConnection)
  async showcases(
    @Args() query: ShowcaseQuery,
  ): Promise<ConnectionType<ShowcaseDto>> {
    return ShowcaseConnection.createFromPromise(
      (q) => this.service.query(q),
      query,
    );
  }

  @Query(() => ShowcaseDto)
  async showcase(@Args('slug') slug: string): Promise<ShowcaseDto | undefined> {
    return await this.service.getOneShowcase(slug);
  }

  @CacheControlDirective({ scope: 'PRIVATE' })
  @ResolveField('investorStat', () => ShowcaseInvestorStatDto, {
    nullable: true,
  })
  async investorStat(
    @Parent() parent: ShowcaseDto,
    @GqlCurrentUser() user: AuthDto,
  ) {
    if (!user) return null;
    const stat = new ShowcaseInvestorStatDto(parent);
    if (!stat.canReadThisStat(user)) return null;
    return stat;
  }

  @CacheControlDirective({})
  @Query(() => [String])
  async slugs(): Promise<string[]> {
    return await this.service.slugs();
  }

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => ShowcaseDto)
  async createOneShowcase(
    @MutationHookArgs() input: CreateOneShowcase,
    @GqlCurrentUser() user: AuthDto,
  ) {
    let showcase = await this.service.createOne(input.input);
    showcase = await this.service.setRelation('author', showcase.id, user.uid);
    return showcase;
  }

  @UseGuards(GqlAuthGuard)
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
