import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { imageList } from '../__mocks__/imageList';
import { ShowcaseMediaEntity } from '../data-modules/showcase/entities/showcase.media.entity';

define(ShowcaseMediaEntity, (faker: typeof Faker) => {
  const media = new ShowcaseMediaEntity();
  media.path = faker.random.arrayElement(imageList);
  media.mimetype = 'image/jpeg';
  media.filename = faker.name.title();

  return media;
});
