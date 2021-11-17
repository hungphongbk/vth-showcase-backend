import Faker from 'faker';
import { MediaModel } from '../media/media.model';
import { define } from 'typeorm-seeding';
import { imageList } from '../__mocks__/imageList';

define(MediaModel, (faker: typeof Faker) => {
  const media = new MediaModel();
  media.path = faker.random.arrayElement(imageList);
  media.mimetype = 'image/jpeg';
  media.filename = faker.name.title();

  return media;
});
