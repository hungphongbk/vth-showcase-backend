import { Module } from '@nestjs/common';
import { ShowcaseSeederService } from './showcase-seeder.service';
import { ShowcaseOrmModule } from '../data-modules/showcase/showcase-orm.module';
import { UploadModule } from '@app/upload';

@Module({
  imports: [ShowcaseOrmModule, UploadModule],
  providers: [ShowcaseSeederService],
})
export class SeederModule {}
