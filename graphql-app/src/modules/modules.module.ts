import { Module } from '@nestjs/common';
import { ShowcaseModule } from './showcase/showcase.module';
import { MediaModule } from './media/media.module';
import { HighlightFeatureModule } from './highlight-feature/highlight-feature.module';

@Module({
  imports: [ShowcaseModule, MediaModule, HighlightFeatureModule],
})
export class ModulesModule {}
