import {
  ApolloServerPlugin,
  GraphQLRequestContext,
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
    operationName,
  }: GraphQLRequestContext<GqlContext>): Promise<
    GraphQLRequestListener<GqlContext>
  > {
    const opName = operationName ?? request.operationName;
    if (!!opName) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      context.transaction.setName(opName!);
      context.transaction.setData('query', request.query);
      context.transaction.setData(
        'variables',
        JSON.stringify(request.variables, null, 2),
      );
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
