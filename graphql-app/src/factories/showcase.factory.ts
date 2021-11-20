import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ShowcaseModel } from '../showcase/showcase.model';
import { ShowcaseStatus } from '../showcase/showcase.dtos';

define(ShowcaseModel, (faker: typeof Faker) => {
  const showcase = new ShowcaseModel();
  showcase.name = faker.company.catchPhrase();
  showcase.author = `${faker.name.firstName()} ${faker.name.lastName()}`;

  showcase.status = faker.random.arrayElement([
    ShowcaseStatus.IDEA,
    ShowcaseStatus.COMING,
    ShowcaseStatus.SHOWCASE,
  ]);

  showcase.description = faker.lorem.paragraphs(4);

  return showcase;
});
