import { GqlService } from './gql.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

export const GqlModule = GraphQLModule.forRootAsync({
  imports: [ConfigModule],
  useClass: GqlService,
});
