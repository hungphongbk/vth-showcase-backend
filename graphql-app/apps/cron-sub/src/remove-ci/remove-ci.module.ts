import { Module } from '@nestjs/common';
import { DataModulesTypeormModule } from 'apps/main/src/data-modules/data-modules-typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowcaseEntity } from 'apps/main/src/data-modules/showcase/entities/showcase.entity';
import { MediaEntity } from 'apps/main/src/data-modules/media/media.entity';
import { ShowcaseMediaEntity } from 'apps/main/src/data-modules/showcase/entities/showcase.media.entity';
import { ShowcaseHFMediaEntity } from 'apps/main/src/data-modules/highlight-feature/entities/showcaseHF.media.entity';
import { ShowcaseHFEntity } from 'apps/main/src/data-modules/highlight-feature/entities/showcaseHF.entity';
import { ImageListEntity } from 'apps/main/src/data-modules/image-list/entities/image-list.entity';
import { ImageListMediaEntity } from 'apps/main/src/data-modules/image-list/entities/image-list.media.entity';
import { CommentEntity } from 'apps/main/src/data-modules/comment/comment.entity';
import { PrjUpdateEntity } from 'apps/main/src/data-modules/prj-update/prj-update.entity';
import { PreorderEntity } from 'apps/main/src/data-modules/preorder/entities/preorder.entity';
import { RemoveCiController } from './remove-ci.controller';

@Module({
  imports: [
    DataModulesTypeormModule,
    TypeOrmModule.forFeature([
      ShowcaseEntity,
      MediaEntity,
      ShowcaseMediaEntity,
      ShowcaseHFMediaEntity,
      ShowcaseHFEntity,
      ImageListEntity,
      ImageListMediaEntity,
      CommentEntity,
      PrjUpdateEntity,
      PreorderEntity,
    ]),
  ],
  controllers: [RemoveCiController],
})
export class RemoveCiModule {}
