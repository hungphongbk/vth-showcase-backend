import { GqlOptionsFactory } from '@nestjs/graphql';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { join } from 'path';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import Redis from 'ioredis';
import { createContext } from './gql.context';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { currencyDirectiveTransformer } from './directives/currency.directive';
import { DirectiveLocation, GraphQLDirective } from 'graphql';

@Injectable()
export class GqlService implements GqlOptionsFactory {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
    @InjectSentry() private readonly sentryClient: SentryService,
  ) {}
  createGqlOptions(): ApolloDriverConfig {
    const cache = new BaseRedisCache({
        client: new Redis({
          host: this.configService.get('REDIS_HOST'),
          port: this.configService.get('REDIS_PORT'),
        }),
      }),
      enableIntrospection =
        this.configService.get<boolean>('GQL_INTROSPECTION'),
      sentryInstance = this.sentryClient.instance();

    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV === 'development',
      playground: false,
      introspection: enableIntrospection,
      transformSchema: currencyDirectiveTransformer('currency'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'currency',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      persistedQueries: {
        cache,
      },
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: this.configService.get('APOLLO_GRAPH_REF'),
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
      context: (ctx) => createContext(ctx, sentryInstance),
      formatError: (error) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sentryId =
          error && error.originalError && (error.originalError as any).sentryId;
        // if we didn't report this to sentry, we know this error is something we expected, so just return the error.
        if (sentryId === undefined) {
          return error;
        }

        let errorResponse: { message: string; debug?: object } = {
          message: `Something unexpected happened. Sentry ID: ${sentryId}`,
        };

        // attach the whole error object for non-production environment.
        // if (!config.isProduction) {
        errorResponse = {
          ...errorResponse,
          debug: error,
        };
        // }

        return errorResponse;
      },
    };
  }
}
