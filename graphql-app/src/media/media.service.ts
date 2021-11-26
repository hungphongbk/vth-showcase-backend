import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaModel } from './media.model';
import { Repository } from 'typeorm';
import { MediaDto } from './dtos/media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaModel) private repo: Repository<MediaModel>,
  ) {}

  async findById(id: string) {
    return await this.repo.findOne({ id });
  }

  async saveMediaData(media: MediaDto) {
    const newMedia = await this.repo.create(media);
    await this.repo.save(newMedia);
    return newMedia;
  }
}
