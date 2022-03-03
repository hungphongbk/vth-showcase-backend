import baseSlugify from 'slugify';
import * as crypto from 'crypto';

export function slugify(str: string, useTimestamp?: boolean) {
  const currentTs = new Date().valueOf().toString();
  const id = crypto
    .createHash('sha1')
    .update(useTimestamp ? currentTs : str)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();
  return `${baseSlugify(str, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    locale: 'vi',
  })}-${id}`;
}
