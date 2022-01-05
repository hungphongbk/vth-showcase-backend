import { SchemaDirectiveVisitor } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLField } from 'graphql';

export class SsrOnlyDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>,
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const context = args[2] as any;
      console.log(context.req);
      return await resolve.apply(this, args);
    };
  }
}
