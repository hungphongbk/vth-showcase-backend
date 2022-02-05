import {
  ApolloServerPlugin,
  GraphQLRequestExecutionListener,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { GqlContext } from '../gql.context';
import { Plugin } from '@nestjs/graphql';

@Plugin()
export class GqlSentryTransactionPlugin
  implements ApolloServerPlugin<GqlContext>
{
  async requestDidStart({
    request,
    context,
  }): Promise<GraphQLRequestListener<GqlContext>> {
    if (!!request.operationName) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      context.transaction.setName(request.operationName!);
    }
    return {
      async willSendResponse({ context }): Promise<void> {
        // hook for transaction finished
        context.transaction.finish();
      },
      async executionDidStart(): Promise<GraphQLRequestExecutionListener> {
        return {
          willResolveField({ context, info }) {
            // hook for each new resolver
            const span = context.transaction.startChild({
              op: 'resolver',
              description: `${info.parentType.name}.${info.fieldName}`,
            });
            return () => {
              // this will execute once the resolver is finished
              span.finish();
            };
          },
        };
      },
    };
  }
}
