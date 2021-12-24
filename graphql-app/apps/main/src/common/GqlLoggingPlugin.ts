import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { Logger } from '@nestjs/common';
import { SentryLoggerService } from '../sentry-logger/sentry-logger.service';

@Plugin()
export class GqlLoggingPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(this.constructor.name, {
    timestamp: false,
  });

  constructor(private readonly sentry: SentryLoggerService) {}

  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>,
  ): Promise<GraphQLRequestListener> {
    const logger = this.logger,
      sentry = this.sentry;
    return {
      async willSendResponse() {
        logger.log(requestContext.request.operationName);
      },
      async didEncounterErrors(ctx) {
        for (const error of ctx.errors) {
          const err = error.originalError || error;

          let sentryId = `gql-${new Date().valueOf().toString()}`;
          sentry.withScope((scope) => {
            // if (context.user) {
            //   scope.setUser({
            //     id: context.user.id,
            //     email: context.user.email,
            //     username: context.user.handle,
            //     ip_address: context.req.ip,
            //   });
            // }
            scope.setTag('kind', ctx.operation.operation);
            // Log query and variables as extras
            // (make sure to strip out sensitive data!)
            scope.setExtra('query', ctx.request.query);
            scope.setExtra('variables', ctx.request.variables);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (err.path) {
              // We can also add the path as breadcrumb
              scope.addBreadcrumb({
                category: 'query-path',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                message: err.path.join(' > '),
                level: sentry.Severity.Debug,
              });
            }
            sentryId = sentry.captureException(err);
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
