import { Args, ArgsType, Resolver } from '@nestjs/graphql';
import { CommentDto } from './comment.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { CommentEntity } from './comment.entity';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import {
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import { CommentCreateDto } from './comment.create.dto';
import { ShowcaseQueryService } from '../showcase/query-services/showcase-query.service';
import { UseGuards } from '@nestjs/common';
import { AuthDto, CurrentUser, GqlAuthGuard } from '../../auth';

@ArgsType()
class CreateCommentArgsType extends MutationArgsType(CommentCreateDto) {}

@Resolver(() => CommentDto)
export class CommentResolver {
  constructor(
    @InjectQueryService(CommentEntity)
    private readonly commentQueryService: QueryService<CommentDto>,
    private readonly showcaseService: ShowcaseQueryService,
  ) {}

  @ResolverMutation(() => CommentDto)
  async postAnonymousComment(
    @Args('slug') slug: string,
    @MutationHookArgs() input: CreateCommentArgsType,
  ) {
    let comment = await this.commentQueryService.createOne(input.input);
    const showcase = await this.showcaseService.getOneShowcase(slug);
    comment = await this.commentQueryService.setRelation(
      'showcase',
      comment.id,
      showcase.id,
    );
    // if (user)
    //   comment = await this.service.setRelation('author', comment.id, user.uid);
    return comment;
  }

  @UseGuards(GqlAuthGuard)
  @ResolverMutation(() => CommentDto)
  async postAuthorizedComment(
    @Args('slug') slug: string,
    @MutationHookArgs() input: CreateCommentArgsType,
    @CurrentUser() user: AuthDto,
  ) {
    let comment = await this.commentQueryService.createOne({
      ...input.input,
      authorUid: user.uid,
      isTopComment: input.input.isTopComment ?? false,
    });
    const showcase = await this.showcaseService.getOneShowcase(slug);
    comment = await this.commentQueryService.setRelation(
      'showcase',
      comment.id,
      showcase.id,
    );
    return comment;
  }
}
