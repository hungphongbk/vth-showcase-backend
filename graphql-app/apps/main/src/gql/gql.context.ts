import { TransactionOperationTypes } from '@app/sentry-logger';
import * as Sentry from '@sentry/node';

import { Transaction } from '@sentry/types';
import { Request } from 'express';

export type GqlContext = {
  request: Request;
  transaction: Transaction;
};

export async function createContext(
  ctx: Omit<GqlContext, 'transaction'>,
  sentryInstance: typeof Sentry,
): Promise<GqlContext> {
  const transaction = sentryInstance.startTransaction({
    op: TransactionOperationTypes.GQL,
    name: 'GraphQLTransaction', // this will be the default name, unless the gql query has a name
    tags: {
      startFromPlatform:
        (ctx.request.headers['x-vth-from'] as string) ?? ctx.request.hostname,
    },
  });

  return { ...ctx, transaction };
}
