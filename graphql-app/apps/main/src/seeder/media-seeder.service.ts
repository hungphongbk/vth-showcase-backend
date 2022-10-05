import { Inject, Injectable } from '@nestjs/common';
import { MediaEntity } from '../data-modules/media/media.entity';
import { join } from 'path';
import { UploadService } from '@app/upload';

interface MediaCreatorClass<T extends MediaEntity> {
  new (): T;
}

@Injectable()
export class MediaSeederService {
  constructor(@Inject(UploadService) private readonly upload: UploadService) {}
  async create<T extends MediaEntity>(
    Cls: MediaCreatorClass<T>,
    filePath: string,
  ) {
    const image = await this.upload.execute(join(__dirname, filePath)),
      imgEntity = new Cls();
    imgEntity.path = image.path;
    imgEntity.preloadUrl = image.preload;
    imgEntity.filename = 'foo.webp';
    imgEntity.mimetype = 'image/webp';
    imgEntity.width = image.width;
    imgEntity.height = image.height;
    return imgEntity;
  }
}
