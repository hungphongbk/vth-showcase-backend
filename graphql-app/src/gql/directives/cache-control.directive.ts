import { applyDecorators } from '@nestjs/common';
import { Directive } from '@nestjs/graphql';

export const CacheControlDirective = ({
  scope = 'PUBLIC',
}: {
  scope?: 'PUBLIC' | 'PRIVATE';
}) => applyDecorators(Directive(`@cacheControl(scope: ${scope})`));
