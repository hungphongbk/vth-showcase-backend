import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowcaseModel } from './showcase.model';
import { Repository } from 'typeorm';

@Injectable()
export class ShowcaseService {
  constructor(
    @InjectRepository(ShowcaseModel)
    private itemRepo: Repository<ShowcaseModel>,
  ) {}

  items() {
    return this.itemRepo.find();
  }
}
