import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { join } from 'path';
import { CurrencyDirective } from './directives/currency.directive';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import Redis from 'ioredis';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

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
      },
      persistedQueries: {
        cache,
      },
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 15 }),
        responseCachePlugin({
          cache,
          sessionId: (requestContext) =>
            requestContext.request.http.headers.get('Authorization') || null,
        }),
      ],
    };
  }
}
