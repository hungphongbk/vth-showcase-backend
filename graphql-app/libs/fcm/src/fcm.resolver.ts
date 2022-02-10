import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FcmRegistrationTokenDto } from '@app/fcm/dtos/fcm-registration-token.dto';
import { UseGuards } from '@nestjs/common';
import { AuthDto, CurrentUser, GqlAuthGuard } from '@app/auth';
import { FcmRegistrationTokenDtoQueryService } from '@app/fcm/services/query-service';

@Resolver()
export class FcmResolver {
  constructor(
    private readonly queryService: FcmRegistrationTokenDtoQueryService,
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
}
