import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { HighlightFeatureModule } from './highlight-feature/highlight-feature.module';
import { ImageListModule } from './image-list/image-list.module';
import { SettingsModule } from './setting/settings.module';
import { InvestmentModule } from './investment';
import { ShowcaseModule } from './showcase/showcase.module';
import { CommentModule } from './comment/comment.module';
import { PrjUpdateModule } from './prj-update/prj-update.module';
import { PreorderModule } from './preorder/preorder.module';
import { DataModulesTypeormModule } from './data-modules-typeorm.module';
import { BrandModule } from './brand';
import { ShowcaseInvestPkgModule } from './showcase-invest-pkg';

@Module({
  imports: [
    DataModulesTypeormModule,
    ShowcaseModule,
    MediaModule,
    HighlightFeatureModule,
    ImageListModule,
    SettingsModule,
    InvestmentModule,
    CommentModule,
    PrjUpdateModule,
    PreorderModule,
    BrandModule,

    ShowcaseInvestPkgModule,
  ],
  exports: [ShowcaseModule],
})
export class DataModulesModule {}
