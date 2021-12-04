import { Module } from '@nestjs/common';
import { ShowcaseModule } from './showcase/showcase.module';
import { MediaModule } from './media/media.module';
import { HighlightFeatureModule } from './highlight-feature/highlight-feature.module';
import { ImageListModule } from './image-list/image-list.module';
import { SettingsModule } from './setting/settings.module';
import { InvestmentModule } from './investment/investment.module';

@Module({
  imports: [
    ShowcaseModule,
    MediaModule,
    HighlightFeatureModule,
    ImageListModule,
    SettingsModule,
    InvestmentModule,
  ],
})
export class DataModulesModule {}
