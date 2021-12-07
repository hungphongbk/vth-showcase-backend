import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './comment.dto';
import { CommentResolver } from './comment.resolver';
import { ShowcaseModule } from '../showcase/showcase.module';

const ormModule = NestjsQueryTypeOrmModule.forFeature([CommentEntity]);

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [ormModule],
      resolvers: [
        {
          DTOClass: CommentDto,
          EntityClass: CommentEntity,
        },
      ],
    }),
    ormModule,
    ShowcaseModule,
  ],
  exports: [ormModule],
  providers: [CommentResolver],
})
export class CommentModule {}
