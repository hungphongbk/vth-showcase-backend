import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache, TtlFunction } from 'cache-manager';

const logger = new Logger('Cache');

export function CacheDecorator({
  key,
  ttl,
}: {
  key?: string;
  ttl?: number | TtlFunction;
}) {
  const cacheInjection = Inject(CACHE_MANAGER);

  return function (
    target: Record<string, any>,
    _,
    descriptor: PropertyDescriptor,
  ) {
    cacheInjection(target, 'cacheManager');
    const original = descriptor.value;

    descriptor.value = async function (...args: Array<any>) {
      const entryKey = `${key}[${args
        .map((res) => JSON.stringify(res))
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
