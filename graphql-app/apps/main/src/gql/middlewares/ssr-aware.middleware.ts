import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const SsrAwareMiddleware: FieldMiddleware = async (
  { context }: MiddlewareContext,
  next: NextFn,
) => {
  if (context.req.headers.ssr) return null;
  return await next();
};
