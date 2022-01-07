import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { join } from 'path';
import { CurrencyDirective } from './directives/currency.directive';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import Redis from 'ioredis';
import { SsrAwareDirective } from './directives/ssr-aware.directive';

@Injectable()
export class GqlService implements GqlOptionsFactory {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}
  createGqlOptions(): GqlModuleOptions {
    const cache = new BaseRedisCache({
      client: new Redis({
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
      }),
    });
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV === 'development',
      playground: true,
      introspection: true,
      schemaDirectives: {
        currency: CurrencyDirective,
        ssrAware: SsrAwareDirective,
      },
      persistedQueries: {
        cache,
      },
      plugins: [
        // ApolloServerPluginCacheControl({ defaultMaxAge: 15 }),
        // responseCachePlugin({
        //   cache,
        //   sessionId: (requestContext) =>
        //     requestContext.request.http.headers.get('Authorization') || null,
        // }),
      ],
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
