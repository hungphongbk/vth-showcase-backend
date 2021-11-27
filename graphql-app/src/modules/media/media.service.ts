import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from './media.entity';
import { Repository } from 'typeorm';
import { MediaDto } from './dtos/media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity) private repo: Repository<MediaEntity>,
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
