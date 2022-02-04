import { Injectable } from '@nestjs/common';

@Injectable()
export class CronPubService {
  getHello(): string {
    return 'Hello World!';
  }
}
