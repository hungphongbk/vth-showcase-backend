import { Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { PathLike } from 'fs';
import * as FormData from 'form-data';
import fetch from 'node-fetch';
import { EntityRepository } from 'typeorm';
import { UPLOAD_CONFIG, UploadConfig } from '@app/upload/uploadConfig';
import { urlJoin } from 'url-join-ts';

export type UploadResponse = {
  id: string;
  path: string;
  preload: string;
};

@Injectable()
@EntityRepository()
export class UploadService {
  private logger = new Logger(UploadService.name);
  constructor(
    @Inject(UPLOAD_CONFIG)
    private readonly config: UploadConfig,
  ) {}

  get uploadURL() {
    return `${this.config.host}:${this.config.port}/upload?token=${this.config.token}`;
  }

  async execute(filePath: PathLike): Promise<UploadResponse> {
    const stat = fs.statSync(filePath),
      fileBuffer = fs.createReadStream(filePath);
    const form = new FormData();
    form.append('file', fileBuffer, { knownLength: stat.size });
    const response = await fetch(this.uploadURL, {
      method: 'POST',
      body: form,
    });
    const obj = (await response.json()) as UploadResponse;
    obj.path = urlJoin(this.config.publicPath, obj.path);
    return obj;
  }
}
