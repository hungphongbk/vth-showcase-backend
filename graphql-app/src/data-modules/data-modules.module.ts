import { Module } from '@nestjs/common';
import { ShowcaseModule } from './showcase/showcase.module';
import { MediaModule } from './media/media.module';
import { HighlightFeatureModule } from './highlight-feature/highlight-feature.module';
import { ImageListModule } from './image-list/image-list.module';
import { SettingsModule } from './setting/settings.module';

@Module({
  imports: [
    ShowcaseModule,
    MediaModule,
    HighlightFeatureModule,
    ImageListModule,
    SettingsModule,
  ],
})
export class DataModulesModule {}
