import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowcaseModel } from './showcase.model';
import { ShowcaseResolver } from './showcase.resolver';
import { ShowcaseService } from './showcase.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShowcaseModel])],
  providers: [ShowcaseResolver, ShowcaseService],
})
export class ShowcaseModule {}
