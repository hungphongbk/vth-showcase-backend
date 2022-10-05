import { Module } from '@nestjs/common';
import { ShowcaseModule } from '../../data-modules/showcase/showcase.module';
import { GaDataModule } from '@app/ga-data';
import { UpdateShowcaseViewsController } from './update-showcase-views.controller';
import { RemoveCiController } from './remove-ci.controller';
import { RabbitmqClientModule } from '@app/rabbitmq-client';

@Module({
  imports: [GaDataModule, ShowcaseModule, RabbitmqClientModule],
  controllers: [UpdateShowcaseViewsController, RemoveCiController],
})
export class ShowcaseMicroserviceModule {}
