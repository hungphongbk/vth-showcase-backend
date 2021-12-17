import { Module } from '@nestjs/common';
import { ShowcaseModule } from './showcase/showcase.module';
import { MediaModule } from './media/media.module';
import { HighlightFeatureModule } from './highlight-feature/highlight-feature.module';
import { ImageListModule } from './image-list/image-list.module';
import { SettingsModule } from './setting/settings.module';
import { InvestmentModule } from './investment/investment.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from '../ormconfig';
import { ShowcaseEntity } from './showcase/entities/showcase.entity';
import { ShowcaseMediaEntity } from './showcase/entities/showcase.media.entity';
import { MediaEntity } from './media/media.entity';
import { ShowcaseHFEntity } from './highlight-feature/entities/showcaseHF.entity';
import { ShowcaseHFMediaEntity } from './highlight-feature/entities/showcaseHF.media.entity';
import { ImageListEntity } from './image-list/entities/image-list.entity';
import { ImageListMediaEntity } from './image-list/entities/image-list.media.entity';
import { InvestmentPackageEntity } from './investment/investment.package.entity';
import { CommentEntity } from './comment/comment.entity';
import { SettingEntity } from './setting/setting.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        Object.assign(connectionOptions, {
          entities: [
            ShowcaseEntity,
            ShowcaseMediaEntity,
            MediaEntity,
            ShowcaseHFEntity,
            ShowcaseHFMediaEntity,
            ImageListEntity,
            ImageListMediaEntity,
            InvestmentPackageEntity,
            CommentEntity,
            SettingEntity,
          ],
        }),
    }),
    ShowcaseModule,
    MediaModule,
    HighlightFeatureModule,
    ImageListModule,
    SettingsModule,
    InvestmentModule,
    CommentModule,
  ],
})
export class DataModulesModule {}
