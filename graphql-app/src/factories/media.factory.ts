import Faker from 'faker';
import { MediaEntity } from '../media/media.entity';
import { define } from 'typeorm-seeding';
import { imageList } from '../__mocks__/imageList';

define(MediaEntity, (faker: typeof Faker) => {
  const media = new MediaEntity();
  media.path = faker.random.arrayElement(imageList);
  media.mimetype = 'image/jpeg';
  media.filename = faker.name.title();

  return media;
});
