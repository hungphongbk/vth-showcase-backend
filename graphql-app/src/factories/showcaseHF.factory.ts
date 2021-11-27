import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ShowcaseHFEntity } from '../modules/highlight-feature/entities/showcaseHF.entity';

define(ShowcaseHFEntity, (faker: typeof Faker) => {
  const hf = new ShowcaseHFEntity();
  hf.name = faker.name.jobTitle();
  hf.description = faker.name.jobDescriptor();

  return hf;
});
