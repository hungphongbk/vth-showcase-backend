import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthDto } from '../dtos/auth.dto';
import { GqlAuthGuard } from '../guards/gql.auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Resolver(() => AuthDto)
export class AuthResolver {
  @UseGuards(GqlAuthGuard)
  @Query(() => AuthDto)
  async currentUser(@CurrentUser() user: AuthDto) {
    return user;
  }
}
