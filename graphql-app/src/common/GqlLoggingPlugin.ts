import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { Logger } from '@nestjs/common';

@Plugin()
export class GqlLoggingPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(this.constructor.name, {
    timestamp: false,
  });

  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>,
  ): Promise<GraphQLRequestListener> {
    const logger = this.logger;
    return {
      async willSendResponse() {
        logger.log(requestContext.request.operationName);
      },
    };
  }
}
