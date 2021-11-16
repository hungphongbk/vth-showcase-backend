import { Module } from '@nestjs/common';
import { MediaService } from './media.service';

@Module({
  providers: [MediaService]
})
export class MediaModule {}
