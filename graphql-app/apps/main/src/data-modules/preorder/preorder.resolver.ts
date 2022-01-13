import {
  Args,
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { PreorderDto } from './dtos/preorder.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { PreorderEntity } from './entities/preorder.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthDto, CurrentUser, GqlOptionalAuthGuard } from '../../auth';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { ShowcaseQueryService } from '../showcase/showcase.queryService';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

@ObjectType({ isAbstract: true })
class PreorderResponseTokenDto {
  @Field({ nullable: true })
  customToken?: string;
}
@ObjectType()
class PreorderResponseDto extends IntersectionType(
  PreorderDto,
  PreorderResponseTokenDto,
  ObjectType,
) {}

@InputType()
class PreorderRequestInputDto {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  phoneNumber: string;

  @Field({ nullable: false })
  email: string;
}

@Resolver(() => PreorderResponseDto)
export class PreorderResolver {
  constructor(
    @InjectQueryService(PreorderEntity)
    private readonly service: QueryService<PreorderDto>,
    private readonly showcaseService: ShowcaseQueryService,
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {
    //
  }

  @UseGuards(GqlOptionalAuthGuard)
  @ResolverMutation(() => PreorderResponseDto)
  async createOnePreorder(
    @Args('slug') slug: string,
    @Args('input', {
      type: () => PreorderRequestInputDto,
      nullable: true,
    })
    input: PreorderRequestInputDto | undefined,
    @CurrentUser() user: AuthDto | undefined,
  ): Promise<PreorderResponseDto> {
    let uid = user?.uid,
      token: string | undefined = undefined;

    if (!uid) {
      const anonymous = await this.createUserAnonymously(input);
      uid = anonymous[0].uid;
      token = anonymous[1];
    }

    let preorder = await this.service.createOne({ authorUid: uid });
    const showcase = await this.showcaseService.getOneShowcase(slug);
    preorder = await this.service.setRelation(
      'showcase',
      preorder.id,
      showcase.id,
    );
    return {
      ...preorder,
      customToken: token,
    };
  }

  async createUserAnonymously(
    input: PreorderRequestInputDto,
  ): Promise<[UserRecord, string]> {
    let userRecord;
    try {
      userRecord = await this.firebaseAdmin.auth().getUserByEmail(input.email);
    } catch (e) {
      userRecord = await this.firebaseAdmin.auth().createUser({
        email: input.email,
        emailVerified: true,
        phoneNumber: input.phoneNumber,
        displayName: input.name,
        disabled: false,
      });
    }

    const customToken = await this.firebaseAdmin
      .auth()
      .createCustomToken(userRecord.uid);

    return [userRecord, customToken];
  }
}
