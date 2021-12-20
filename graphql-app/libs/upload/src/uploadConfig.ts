import { ConfigType, registerAs } from '@nestjs/config';

export const uploadConfig = registerAs('upload', () => {
  const host: string = (process.env.UPLOAD_HOST as string).replace(
      /^(https?:)\/[^/]/,
      '$1:///',
    ),
    port = +process.env.UPLOAD_PORT,
    token: string = process.env.UPLOAD_HOST_TOKEN,
    publicPath = `${host}:${port}`;

  return { host, port, token, publicPath };
});

export type UploadConfig = ConfigType<typeof uploadConfig>;

export const UPLOAD_CONFIG = uploadConfig.KEY;
