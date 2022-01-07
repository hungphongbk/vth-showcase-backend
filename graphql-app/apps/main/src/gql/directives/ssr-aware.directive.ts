import { SchemaDirectiveVisitor } from '@graphql-tools/utils';
import { defaultFieldResolver, getNullableType, GraphQLField } from 'graphql';
import { GqlContext } from '../gql.context';

export class SsrAwareDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>,
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver, type } = field;
    field.type = getNullableType(type);
    field.resolve = async function (...args) {
      const context = args[2] as GqlContext;
      if (context.req.headers['ssr'] === 'true') return null;
      return await resolve.apply(this, args);
    };
  }
}
