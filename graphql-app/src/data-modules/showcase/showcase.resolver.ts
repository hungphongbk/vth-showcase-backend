import { Args, ArgsType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ShowcaseDto } from './dtos/showcase.dtos';
import { GqlAuthGuard } from '../../auth/gql.auth.guard';
import { ShowcaseConnection, ShowcaseQuery } from './dtos/query.types';
import {
  ConnectionType,
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { ShowcaseQueryService } from './showcase.queryService';
import { ShowcaseCreateInputDto } from './dtos/showcase.create.dto';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';

const guards = [GqlAuthGuard];

@ArgsType()
class CreateOneShowcase extends MutationArgsType(ShowcaseCreateInputDto) {}

@Resolver(() => ShowcaseDto)
export class ShowcaseResolver {
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
    return (await this.service.query({ filter: { slug: { eq: slug } } }))[0];
  }

  @Query(() => [String])
  async slugs(): Promise<string[]> {
    return (await this.service.query({ paging: { limit: 10000 } })).map(
      (i) => i.slug,
    );
  }

  @ResolverMutation(() => ShowcaseDto)
  createOneShowcase(@MutationHookArgs() input: CreateOneShowcase) {
    return this.service.createOne(input.input);
  }

  @Mutation(() => ShowcaseDto)
  deleteOneShowcase(@Args('slug') slug: string) {
    return this.service.deleteMany({
      slug: { eq: slug },
    });
  }
}
