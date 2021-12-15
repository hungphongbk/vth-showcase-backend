import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

export class ControllerAuthGuard extends AuthGuard('firebase') {}

@Injectable()
export class GqlAuthGuard extends ControllerAuthGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class GqlOptionalAuthGuard extends GqlAuthGuard {
  handleRequest(err, user) {
    return user;
  }
}
