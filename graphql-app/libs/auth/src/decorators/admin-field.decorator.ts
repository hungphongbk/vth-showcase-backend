import {
  Field,
  FieldMiddleware,
  FieldOptions,
  MiddlewareContext,
  NextFn,
  ReturnTypeFunc,
} from '@nestjs/graphql';
import { isFunction } from '@nestjs/common/utils/shared.utils';
import { AuthDto, AuthRoleType } from '@app/auth';
import { ForbiddenException } from '@nestjs/common';

export const checkRoleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const user = ctx.context.req.user as unknown as AuthDto;

  if (
    ![AuthRoleType.ADMIN, AuthRoleType.SUPERADMIN].some((v) => v === user.role)
  ) {
    throw new ForbiddenException(
      `User does not have sufficient permissions to access "${ctx.info.fieldName}" field.`,
    );
  }

  return next();
};

export function AdminField(): PropertyDecorator & MethodDecorator;
export function AdminField(
  options: FieldOptions,
): PropertyDecorator & MethodDecorator;
export function AdminField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: FieldOptions,
): PropertyDecorator & MethodDecorator;
export function AdminField(
  typeOrOptions?: ReturnTypeFunc | FieldOptions,
  fieldOptions?: FieldOptions,
) {
  const [typeFunc, options = {}] = isFunction(typeOrOptions)
    ? [typeOrOptions, fieldOptions]
    : [undefined, typeOrOptions as any];
  if (Array.isArray(options.middleware)) {
    options.middleware.push(checkRoleMiddleware);
  } else options.middleware = [checkRoleMiddleware];
  return Field(typeFunc as any, options as any);
}
