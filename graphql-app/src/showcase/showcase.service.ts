import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowcaseModel } from './showcase.model';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ShowcaseService {
  constructor(
    @InjectRepository(ShowcaseModel)
    private itemRepo: Repository<ShowcaseModel>,
  ) {}

  getAll() {
    return this.itemRepo.find();
  }

  getRelated(excludeId: string) {
    return this.itemRepo.find({ id: Not(excludeId) });
  }

  getOne(id: string) {
    return this.itemRepo.findOne({ id });
  }
}
