import { GqlService } from './gql.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const GqlModule = GraphQLModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GQL_INTROSPECTION: Joi.boolean().required(),
      }),
    }),
  ],
  useClass: GqlService,
});
