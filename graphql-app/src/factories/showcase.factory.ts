import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ShowcaseEntity } from '../showcase/showcase.entity';
import { ShowcaseStatus } from '../showcase/showcase.dtos';

define(ShowcaseEntity, (faker: typeof Faker) => {
  const showcase = new ShowcaseEntity();
  showcase.name = faker.company.catchPhrase();
  showcase.author = `${faker.name.firstName()} ${faker.name.lastName()}`;

  showcase.status = faker.random.arrayElement([
    ShowcaseStatus.IDEA,
    ShowcaseStatus.COMING,
    ShowcaseStatus.SHOWCASE,
  ]);

  showcase.expectedSaleAt = faker.date.future(2, new Date());

  showcase.description = faker.lorem.paragraphs(4);

  return showcase;
});
