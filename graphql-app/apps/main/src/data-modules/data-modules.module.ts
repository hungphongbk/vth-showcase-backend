import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { HighlightFeatureModule } from './highlight-feature/highlight-feature.module';
import { ImageListModule } from './image-list/image-list.module';
import { SettingsModule } from './setting/settings.module';
import { InvestmentModule, InvestmentPackageEntity } from './investment';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from '../ormconfig';
import { MediaEntity } from './media/media.entity';
import { ShowcaseHFEntity } from './highlight-feature/entities/showcaseHF.entity';
import { ShowcaseHFMediaEntity } from './highlight-feature/entities/showcaseHF.media.entity';
import { ImageListEntity } from './image-list/entities/image-list.entity';
import { ImageListMediaEntity } from './image-list/entities/image-list.media.entity';
import { SettingEntity } from './setting/setting.entity';
import { ShowcaseEntity } from './showcase/entities/showcase.entity';
import { ShowcaseMediaEntity } from './showcase/entities/showcase.media.entity';
import { ShowcaseModule } from './showcase/showcase.module';
import { CommentEntity } from './comment/comment.entity';
import { CommentModule } from './comment/comment.module';
import { PrjUpdateEntity } from './prj-update/prj-update.entity';
import { PrjUpdateModule } from './prj-update/prj-update.module';
import { PreorderModule } from './preorder/preorder.module';
import { PreorderEntity } from './preorder/entities/preorder.entity';
import { ShowcaseViewEntity } from './showcase/entities/showcase-view.entity';

function globImport(r: any) {
  return r
    .keys()
    .map(r)
    .reduce((acc, val) => [...acc, ...Object.values(val)], []);
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        Object.assign(connectionOptions, {
          entities: [
            ShowcaseEntity,
            ShowcaseViewEntity,
            ShowcaseMediaEntity,
            MediaEntity,
            ShowcaseHFEntity,
            ShowcaseHFMediaEntity,
            ImageListEntity,
            ImageListMediaEntity,
            InvestmentPackageEntity,
            CommentEntity,
            SettingEntity,
            PrjUpdateEntity,
            PreorderEntity,
          ],
          migrations: globImport(
            require.context('../migrations', false, /\.ts/),
          ),
        }),
    }),
    ShowcaseModule,
    MediaModule,
    HighlightFeatureModule,
    ImageListModule,
    SettingsModule,
    InvestmentModule,
    CommentModule,
    PrjUpdateModule,
    PreorderModule,
  ],
})
export class DataModulesModule {}
