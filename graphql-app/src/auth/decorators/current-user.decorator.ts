import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlCurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  any
>((_, context) => {
  const ctx = GqlExecutionContext.create(context);
  console.log(ctx.getContext().req.user);
  return ctx.getContext().req.user;
});
