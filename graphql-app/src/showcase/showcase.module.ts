import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowcaseModel } from './showcase.model';
import { ShowcaseResolver } from './showcase.resolver';
import { ShowcaseService } from './showcase.service';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShowcaseModel]), MediaModule],
  providers: [ShowcaseResolver, ShowcaseService],
})
export class ShowcaseModule {}
