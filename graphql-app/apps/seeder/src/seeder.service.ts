import { Injectable } from '@nestjs/common';

@Injectable()
export class SeederService {
  getHello(): string {
    return 'Hello World!';
  }
}
