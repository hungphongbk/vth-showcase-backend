import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { Logger } from '@nestjs/common';
import { SentryLoggerService } from '../sentry-logger/sentry-logger.service';
import * as Sentry from '@sentry/node';

@Plugin()
export class GqlLoggingPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(this.constructor.name, {
    timestamp: false,
  });

  constructor(private readonly sentry: SentryLoggerService) {}

  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>,
  ): Promise<GraphQLRequestListener> {
    const logger = this.logger;
    return {
      async willSendResponse() {
        logger.log(requestContext.request.operationName);
      },
      async didEncounterErrors(ctx) {
        for (const error of ctx.errors) {
          const err = error.originalError || error;

          let sentryId = `gql-${new Date().valueOf().toString()}`;
          Sentry.withScope((scope) => {
            scope.setTags({
              kind: ctx.operation.operation,
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
            sentryId = Sentry.captureException(err);
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
