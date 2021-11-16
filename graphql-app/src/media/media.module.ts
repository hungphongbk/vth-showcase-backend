import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModel } from './media.model';

@Module({
  imports: [TypeOrmModule.forFeature([MediaModel])],
  providers: [MediaService],
})
export class MediaModule {}
