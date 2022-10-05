import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ControllerAuthGuard } from './controller-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends ControllerAuthGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class GqlAdminAuthGuard extends AuthGuard('firebase-admin') {
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
