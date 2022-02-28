import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export const currencyDirectiveTransformer =
  (directiveName: string) => (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (field) => {
        const upperDirective = getDirective(schema, field, directiveName)?.[0];

        if (upperDirective) {
          const { resolve = defaultFieldResolver } = field;
          field.resolve = async function (...args) {
            const result = await resolve.apply(this, args);
            return (
              (result * 1.0).toLocaleString('vi-VN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }) + ' VNĐ'
            );
          };
          return field;
        }
      },
    });
  };
