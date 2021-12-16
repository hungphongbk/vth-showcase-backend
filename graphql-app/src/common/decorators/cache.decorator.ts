import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache, TtlFunction } from 'cache-manager';
import 'reflect-metadata';

const logger = new Logger('Cache');

const CACHE_METADATA = Symbol('cache-metadata');

interface CacheDecoratorSpec {
  key?: string | symbol;
  ttl?: number | TtlFunction;
}

export function CacheDecorator({ key, ttl }: CacheDecoratorSpec) {
  const cacheInjection = Inject(CACHE_MANAGER);

  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    cacheInjection(target, 'cacheManager');
    const original = descriptor.value;
    const cacheArgIndexes: number[] =
      Reflect.getOwnMetadata(CACHE_METADATA, target, propertyKey) || [];

    descriptor.value = async function (...args: Array<any>) {
      const entryKey = `${String(key)}[${cacheArgIndexes
        .map((index) => JSON.stringify(args[index]))
        .join(',')}]`;
      logger.log(`enter ${entryKey}`);

      const cacheManager = this.cacheManager as unknown as Cache;

      const cachedValue = await cacheManager.get(entryKey);
      if (cachedValue) return cachedValue;
      else {
        logger.log('cache miss. Will assign');
        const willBeCachedValue = await original.apply(this, args);
        if (typeof willBeCachedValue !== 'undefined')
          await cacheManager.set(entryKey, willBeCachedValue, {
            ttl: ttl ?? 30,
          });
        return willBeCachedValue;
      }
    };
  };
}

export function CacheUpdater({ key, ttl }: CacheDecoratorSpec) {
  const cacheInjection = Inject(CACHE_MANAGER);

  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    cacheInjection(target, 'cacheManager');
    const original = descriptor.value;
    const cacheArgIndexes: number[] =
      Reflect.getOwnMetadata(CACHE_METADATA, target, propertyKey) || [];
    descriptor.value = async function (...args: Array<any>) {
      const entryKey = `${String(key)}[${cacheArgIndexes
        .map((index) => JSON.stringify(args[index]))
        .join(',')}]`;
      const willBeCachedValue = await original.apply(this, args);
      const cacheManager = this.cacheManager as unknown as Cache;
      if (typeof willBeCachedValue !== 'undefined')
        await cacheManager.set(entryKey, willBeCachedValue, {
          ttl: ttl ?? 30,
        });
      return willBeCachedValue;
    };
  };
}

export function CacheArg(
  target: Record<string, any>,
  propertyKey: string | symbol,
  parameterIndex: number,
) {
  const existing: number[] =
    Reflect.getOwnMetadata(CACHE_METADATA, target, propertyKey) || [];
  existing.push(parameterIndex);
  Reflect.defineMetadata(CACHE_METADATA, existing, target, propertyKey);
}
