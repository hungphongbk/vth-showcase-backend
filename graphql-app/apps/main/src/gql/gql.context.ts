export type GqlContext = {
  req: { headers: Record<string, string> };
  transaction: Transaction;
};
import * as Sentry from '@sentry/node';

import { Transaction } from '@sentry/types';

export async function createContext(
  ctx: any,
  sentryInstance: typeof Sentry,
): Promise<GqlContext> {
  const transaction = sentryInstance.startTransaction({
    op: 'gql',
    name: 'GraphQLTransaction', // this will be the default name, unless the gql query has a name
  });
  return { ...ctx, transaction };
}
