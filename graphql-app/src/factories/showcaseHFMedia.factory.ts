import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { imageList } from '../__mocks__/imageList';
import { ShowcaseHFMediaEntity } from '../data-modules/highlight-feature/entities/showcaseHF.media.entity';

define(ShowcaseHFMediaEntity, (faker: typeof Faker) => {
  const media = new ShowcaseHFMediaEntity();
  media.path = faker.random.arrayElement(imageList);
  media.mimetype = 'image/jpeg';
  media.filename = faker.name.title();

  return media;
});
