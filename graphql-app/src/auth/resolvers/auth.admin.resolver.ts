import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql.auth.guard';
import { AuthDto, AuthRoleType } from '../dtos/auth.dto';
import { AuthQueryService } from '../auth.query.service';

@Resolver()
export class AuthAdminResolver {
  constructor(private readonly userQueryService: AuthQueryService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [AuthDto])
  async getAllUsers() {
    return await this.userQueryService.query({});
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async updateOneUser(
    @Args('uid') uid: string,
    @Args({ name: 'role', type: () => AuthRoleType }) role: AuthRoleType,
  ) {
    try {
      await this.userQueryService.updateOne(uid, { role });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
