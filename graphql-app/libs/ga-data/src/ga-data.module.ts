import { Module } from '@nestjs/common';
import { GaDataService } from './ga-data.service';
import { VthConfigsModule } from '@app/configs';

@Module({
  imports: [VthConfigsModule],
  providers: [GaDataService],
  exports: [GaDataService],
})
export class GaDataModule {}
