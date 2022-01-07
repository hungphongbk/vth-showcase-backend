import { Module } from '@nestjs/common';
import { ImageListResolver } from './image-list.resolver';
import { MediaModule } from '../media/media.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { ImageListGraphqlOrmModule } from './image-list.graphql-orm.module';
import { ImageListGraphqlModule } from './image-list.graphql.module';

@Module({
  imports: [
    ImageListGraphqlOrmModule,
    ImageListGraphqlModule,
    MediaModule,
    ShowcaseModule,
  ],
  providers: [ImageListResolver],
  exports: [],
})
export class ImageListModule {}
