import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FcmRegistrationTokenDto } from '@app/fcm/dtos/fcm-registration-token.dto';
import { UseGuards } from '@nestjs/common';
import {
  AuthDto,
  CurrentUser,
  GqlAdminAuthGuard,
  GqlAuthGuard,
} from '@app/auth';
import { FcmRegistrationTokenDtoQueryService } from '@app/fcm/services/query-service';
import { FcmPayloadDto } from '@app/fcm/dtos/fcm-payload.dto';
import { FcmService } from '@app/fcm/fcm.service';
import { messaging } from 'firebase-admin';
import MessagingPayload = messaging.MessagingPayload;

@Resolver()
export class FcmResolver {
  constructor(
    private readonly queryService: FcmRegistrationTokenDtoQueryService,
    private readonly fcmService: FcmService,
  ) {
    //
  }

  @Mutation(() => FcmRegistrationTokenDto)
  @UseGuards(GqlAuthGuard)
  subscribeToFcmTopic(
    @Args('token') token: string,
    @Args('topic', { type: () => [String] }) topics: string[],
    @CurrentUser() user: AuthDto,
  ) {
    return this.queryService.createMany(
      topics.map((topic) => ({
        token,
        topic,
        authorUid: user.uid,
      })),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAdminAuthGuard)
  sendNotification(
    @Args('topic') topic: string,
    @Args('payload', { type: () => FcmPayloadDto })
    payload: MessagingPayload,
  ) {
    // noinspection JSIgnoredPromiseFromCall
    this.fcmService.sendToTopic(topic, payload, false);
    return true;
  }
}
