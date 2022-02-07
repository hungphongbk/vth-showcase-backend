import { Module } from '@nestjs/common';
import { ShowcaseModule } from '../../data-modules/showcase/showcase.module';
import { GaDataModule } from '@app/ga-data';
import { UpdateShowcaseViewsController } from './update-showcase-views.controller';
import { RemoveCiController } from './remove-ci.controller';

@Module({
  imports: [GaDataModule, ShowcaseModule],
  controllers: [UpdateShowcaseViewsController, RemoveCiController],
})
export class ShowcaseMicroserviceModule {}
