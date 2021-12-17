import {
  Args,
  ArgsType,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PublishStatus, ShowcaseDto } from '../dtos/showcase.dtos';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import {
  AuthDto,
  AuthRoleType,
  CurrentUser,
  GqlAuthGuard,
} from '../../../auth';
import { ShowcaseQueryService } from '../showcase.queryService';
import {
  MutationArgsType,
  MutationHookArgs,
} from '@nestjs-query/query-graphql';
import {
  ShowcaseCreateInputDto,
  ShowcaseUpdateInputDto,
} from '../dtos/showcase.create.dto';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { UserStatusEnum } from '../dtos/user-status.enum';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';
import { ForbiddenError } from 'apollo-server-express';
import { ShowcaseConnection } from '../dtos/query.types';

@ArgsType()
class CreateOneShowcase extends MutationArgsType(ShowcaseCreateInputDto) {}

@ArgsType()
class UpdateOneShowcase extends MutationArgsType(ShowcaseUpdateInputDto) {}

@Resolver(() => ShowcaseDto)
@UseGuards(GqlAuthGuard)
export class ShowcaseAuthResolver {
  private readonly logger = new Logger(ShowcaseAuthResolver.name);
  constructor(private readonly service: ShowcaseQueryService) {}

  /**
   * Tạo một Showcase mới
   *
   */
  @ResolverMutation(() => ShowcaseDto)
  async createOneShowcase(
    @MutationHookArgs() input: CreateOneShowcase,
    @CurrentUser() user: AuthDto,
  ) {
    if (/^ci-test/.test(input.input.name))
      input.input.publishStatus = PublishStatus.PUBLISHED;
    const showcase = await this.service.createOne(input.input);
    showcase.authorUid = user.uid;
    return showcase;
  }

  /**
   * Cập nhật một showcase
   * TODO
   * @param slug
   * @param input
   */
  @ResolverMutation(() => Boolean)
  async updateOneShowcase(
    @Args('slug') slug: string,
    @MutationHookArgs() input: UpdateOneShowcase,
    // @GqlCurrentUser() user: AuthDto,
  ) {
    await this.service.updateMany(input.input, { slug: { eq: slug } });
    return true;
  }

  /**
   * Xoá một showcase
   * @param slug
   */
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
@UseGuards(GqlAuthGuard)
export class ShowcaseAuthAugmentResolver {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
    private readonly service: ShowcaseQueryService,
  ) {}

  /**
   * Kiểm tra trạng thái Approval của User
   * @param user
   * @param current
   */
  @ResolveField('approvalStatus', () => UserStatusEnum)
  async approvalStatus(
    @Parent() user: AuthDto,
    @CurrentUser() current: AuthDto,
  ) {
    if (current.uid !== user.uid)
      throw new ForbiddenError(
        'Bạn không có quyền truy cập vào tài nguyên này',
      );
    if (user.role === AuthRoleType.INVESTOR)
      return UserStatusEnum.APPROVED_INVESTOR;
    // check current user is existing in firebase cloud firestore
    const submitInvestorRef = this.firebaseAdmin
        .firestore()
        .collection('submit-investor'),
      submitInvestorRefSnapshot = await submitInvestorRef
        .where('email', '==', user.email)
        .get();
    if (submitInvestorRefSnapshot.empty) {
      //return status depends on showcase creation query
      const totalOfCreatedShowcases = await this.service.count({
        authorUid: { eq: user.uid },
      });
      return totalOfCreatedShowcases > 0
        ? UserStatusEnum.APPROVED_CREATOR
        : UserStatusEnum.PENDING_CREATOR;
    } else {
      return submitInvestorRefSnapshot.docs[0].data().status === 'approved'
        ? UserStatusEnum.APPROVED_INVESTOR
        : UserStatusEnum.PENDING_INVESTOR;
    }
  }

  /**
   * Liệt kê toàn bộ Showcase do tác giả đăng tải
   * @param user
   * @param current
   */
  @ResolveField('showcases', () => ShowcaseConnection)
  async listOwnShowcases(
    @Parent() user: AuthDto,
    @CurrentUser() current: AuthDto,
  ) {
    if (current.uid !== user.uid)
      throw new ForbiddenError(
        'Bạn không có quyền truy cập vào tài nguyên này',
      );
    return ShowcaseConnection.createFromPromise((q) => this.service.query(q), {
      filter: {
        publishStatus: { in: [PublishStatus.DRAFT, PublishStatus.PUBLISHED] },
      },
    });
  }
}
