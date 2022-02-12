import {
  Args,
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { PreorderDto } from './dtos/preorder.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { PreorderEntity } from './entities/preorder.entity';
import { Inject, UseGuards } from '@nestjs/common';
import {
  AuthAssembler,
  AuthDto,
  CurrentUser,
  FirebaseUserClass,
  GqlAuthGuard,
  GqlOptionalAuthGuard,
} from '@app/auth';
import { ResolverMutation } from '@nestjs-query/query-graphql/dist/src/decorators';
import { ShowcaseQueryService } from '../showcase/services/showcase-query.service';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@hungphongbk/nestjs-firebase-admin';
import { PreorderConnection, PreorderDtoQuery } from './preorder.connection';
import * as deepmerge from 'deepmerge';
import { NotifyService } from './notify.service';

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
    private readonly notifyService: NotifyService,
    @Inject(AuthAssembler) private readonly converter: AuthAssembler,
  ) {
    //
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PreorderConnection)
  preorders(@CurrentUser() user: AuthDto, @Args() query: PreorderDtoQuery) {
    return PreorderConnection.createFromPromise(
      (q) => this.service.query(q),
      deepmerge(query, {
        filter: { authorUid: { eq: user.uid } },
        paging: { limit: 10 },
      }),
    );
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
    let _user = user;

    if (!uid) {
      const anonymous = await this.createUserAnonymously(input);
      _user = this.converter.convertToDTO(anonymous[0]);
      uid = _user.uid;
      token = anonymous[1];
    }

    const showcase = await this.showcaseService.getOneShowcase(slug);
    let preorder = (
      await this.service.query({
        filter: { authorUid: { eq: uid }, showcaseId: { eq: showcase.id } },
      })
    )[0];
    if (!preorder) {
      preorder = await this.service.createOne({ authorUid: uid });
      preorder = await this.service.setRelation(
        'showcase',
        preorder.id,
        showcase.id,
      );
    }

    await this.notifyService.sendPreorderNotify({
      email: _user.email,
      name: _user.name,
      showcase,
    });
    return {
      ...preorder,
      customToken: token,
    };
  }

  async createUserAnonymously(
    input: PreorderRequestInputDto,
  ): Promise<[FirebaseUserClass, string]> {
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
