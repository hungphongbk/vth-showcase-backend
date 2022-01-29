import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller()
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  getHello(): string {
    return this.seederService.getHello();
  }
}
