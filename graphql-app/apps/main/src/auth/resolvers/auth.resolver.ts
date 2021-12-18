import {
  Args,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';
import { firestore } from 'firebase-admin';
import { AuthDto } from '../dtos/auth.dto';
import { GqlAuthGuard } from '../gql.auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import CollectionReference = firestore.CollectionReference;

@InputType()
class SubmitInvestorInputDto {
  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  job: string;

  @Field()
  purpose: string;

  @Field()
  method: string;

  @Field()
  fund: string;
}

// noinspection JSUnusedGlobalSymbols
const converter = {
  toFirestore: (data: SubmitInvestorInputDto) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as SubmitInvestorInputDto,
};

@Resolver(() => AuthDto)
export class AuthResolver {
  private collection: CollectionReference<SubmitInvestorInputDto>;
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT)
    private readonly firebaseAdmin: FirebaseAdminSDK,
  ) {
    this.collection = firebaseAdmin
      .firestore()
      .collection('submit-investor')
      .withConverter(converter);
  }

  @Mutation(() => Boolean)
  async submitInvestor(
    @Args({ name: 'form', type: () => SubmitInvestorInputDto, nullable: false })
    form: SubmitInvestorInputDto,
  ) {
    await this.collection.add(form);
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => AuthDto)
  async currentUser(@CurrentUser() user: AuthDto) {
    return user;
  }
}
