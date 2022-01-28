import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '@app/auth/guards/gql.auth.guard';
import { AuthDto, AuthRoleType } from '@app/auth/dtos/auth.dto';
import { AuthQueryService } from '@app/auth/services/auth.query.service';

@Resolver()
@UseGuards(GqlAdminAuthGuard)
export class AuthAdminResolver {
  constructor(private readonly userQueryService: AuthQueryService) {}

  @Query(() => [AuthDto])
  async getAllUsers() {
    return await this.userQueryService.query({});
  }

  @Query(() => AuthDto)
  async getOneUser(@Args('uid') uid: string) {
    return await this.userQueryService.getById(uid);
  }

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
