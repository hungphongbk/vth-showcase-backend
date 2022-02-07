import { Inject } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

const sentryKey = Symbol('_sentry');

export enum TransactionOperationTypes {
  GQL = 'gql',
  MICROSERVICE = 'microservice',
}

export const SentryTransaction = (
  op: TransactionOperationTypes,
  name?: string,
) => {
  const injectSentry = Inject(SentryService);

  return (
    target: any,
    _propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    injectSentry(target, sentryKey);
    const originalMethod: () => Promise<void> = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: any[]) {
      const sentry = this[sentryKey] as SentryService;
      const transaction = sentry.instance().startTransaction({
        op: op.toString(),
        name: name ?? _propertyKey,
      });
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        sentry.instance().captureException(error);
        throw error;
      } finally {
        transaction.finish();
      }
    };
  };
};
