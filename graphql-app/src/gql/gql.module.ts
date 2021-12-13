import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CurrencyDirective } from './directives/currency.directive';

export const GqlModule = GraphQLModule.forRoot({
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  debug: process.env.NODE_ENV === 'development',
  playground: true,
  introspection: true,
  schemaDirectives: {
    currency: CurrencyDirective,
  },
});
