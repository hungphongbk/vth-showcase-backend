import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";

@Module({
  imports: [
    GraphQLModule.forRoot({}),
  ]
})
export class AppModule {}
