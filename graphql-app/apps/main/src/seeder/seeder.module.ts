import { Module } from '@nestjs/common';
import { ShowcaseSeederService } from './showcase-seeder.service';
import { ShowcaseOrmModule } from '../data-modules/showcase/services/showcase-orm.module';
import { UploadModule } from '@app/upload';
import { MediaSeederService } from './media-seeder.service';

@Module({
  imports: [ShowcaseOrmModule, UploadModule],
  providers: [ShowcaseSeederService, MediaSeederService],
})
export class SeederModule {}
