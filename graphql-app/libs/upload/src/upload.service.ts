import { Inject, Injectable, Logger } from '@nestjs/common';
import * as FormData from 'form-data';
import fetch from 'node-fetch';
import { EntityRepository } from 'typeorm';
import { UPLOAD_CONFIG, UploadConfig } from '@app/upload/uploadConfig';
import { urlJoin } from 'url-join-ts';
import { HttpHealthIndicator } from '@nestjs/terminus';
import * as fs from 'fs';
import { PathLike } from 'fs';

export type UploadResponse = {
  id: string;
  path: string;
  preload: string;
  width: number;
  height: number;
};

@Injectable()
@EntityRepository()
export class UploadService {
  private logger = new Logger(UploadService.name);
  constructor(
    @Inject(UPLOAD_CONFIG)
    private readonly config: UploadConfig,
    private http: HttpHealthIndicator,
  ) {}

  get internalHostPath() {
    let url = `${this.config.host}:${this.config.port}`;
    if (!/^http/.test(url)) {
      // noinspection HttpUrlsUsage
      url = 'http://' + url;
    }
    return url;
  }
  get uploadURL() {
    return `${this.internalHostPath}/upload?token=${this.config.token}`;
  }

  pingcheck() {
    return this.http.pingCheck('upload-service', this.internalHostPath, {
      headers: {
        'X-Health-Check': 1,
      },
    });
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
