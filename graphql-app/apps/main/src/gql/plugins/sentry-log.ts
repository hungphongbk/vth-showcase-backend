import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { GqlContext } from '../gql.context';
import { GraphQLRequestContextDidEncounterErrors } from 'apollo-server-types';

@Plugin()
export class GqlSentryLoggingPlugin implements ApolloServerPlugin<GqlContext> {
  private readonly logger = new Logger(this.constructor.name, {
    timestamp: false,
  });

  constructor(@InjectSentry() private readonly client: SentryService) {}

  async requestDidStart(
    requestContext: GraphQLRequestContext<GqlContext>,
  ): Promise<GraphQLRequestListener> {
    const logger = this.logger,
      instance = this.client.instance();
    return {
      async willSendResponse() {
        logger.log(requestContext.request.operationName);
      },
      async didEncounterErrors(
        ctx: GraphQLRequestContextDidEncounterErrors<GqlContext>,
      ) {
        for (const error of ctx.errors) {
          const err = error.originalError || error;
          let sentryId = `gql-${new Date().valueOf().toString()}`;
          instance.withScope((scope) => {
            scope.setTags({
              kind: ctx.operation?.operation ?? 'query',
              operationName: ctx.operationName || ctx.request.operationName,
            });
            // Log query and variables as extras
            // (make sure to strip out sensitive data!)
            scope.setExtra('query', ctx.request.query);
            scope.setExtra(
              'variables',
              JSON.stringify(ctx.request.variables, null, 2),
            );
            scope.setExtra('message', err.message + '');
            scope.setSpan(ctx.context.transaction);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (err.path) {
              // We can also add the path as breadcrumb
              scope.setExtras({
                path: error.path,
              });
              scope.addBreadcrumb({
                category: 'query-path',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                message: err.path.join(' > '),
                level: Sentry.Severity.Debug,
              });
            }
            sentryId = instance.captureException(err);
          });

          // HACK; set sentry id to indicate this is an error that we did not expect. `formatError` handler will check for this.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (err as any).sentryId = sentryId;
        }

        return;
      },
    };
  }
}
