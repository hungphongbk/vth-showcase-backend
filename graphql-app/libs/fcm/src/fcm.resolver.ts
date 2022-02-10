import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard, GqlOptionalAuthGuard } from '@app/auth';
import { FcmPayloadDto } from '@app/fcm/dtos/fcm-payload.dto';
import { FcmService } from '@app/fcm/fcm.service';
import { messaging } from 'firebase-admin';
import MessagingPayload = messaging.MessagingPayload;

@Resolver()
export class FcmResolver {
  constructor(private readonly fcmService: FcmService) {
    //
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlOptionalAuthGuard)
  async subscribeToFcmTopic(
    @Args('token') token: string,
    @Args('topic', { type: () => [String] }) topics: string[],
  ) {
    await Promise.all(
      topics.map((topic) => this.fcmService.subscribeToTopic(token, topic)),
    );
    return true;
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
