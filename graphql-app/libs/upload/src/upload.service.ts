import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReadStream } from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { EntityRepository } from 'typeorm';

@Injectable()
@EntityRepository()
export class UploadService {
  constructor(private configService: ConfigService) {}

  get uploadURL() {
    return `${this.configService.get(
      'UPLOAD_INTERNAL_HOST',
    )}:${this.configService.get(
      'UPLOAD_INTERNAL_PORT',
    )}/upload?token=${this.configService.get('UPLOAD_HOST_TOKEN')}`;
  }

  async execute(fileBuffer: ReadStream): Promise<string> {
    const form = new FormData();
    form.append('file', fileBuffer);
    console.log(this.uploadURL);
    const response = await fetch(this.uploadURL, {
      method: 'POST',
      body: form,
    });
    return await response.text();
  }
}
