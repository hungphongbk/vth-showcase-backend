import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export const directiveTransformer = (schema: GraphQLSchema) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (field) => {
      const upperDirective = getDirective(schema, field, 'currency')?.[0];

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

      const ssrDirective = getDirective(schema, field, 'ssr')?.[0];
      if (ssrDirective) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (source, args, context, info) {
          const x_vth_from = context.headers?.['x-vth-from'];
          if (!/^showcase-/.test(x_vth_from)) {
            return null;
          }
          return await resolve.apply(this, [source, args, context, info]);
        };
        return field;
      }
    },
  });
};
