import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ShowcaseEntity } from '../showcase/showcase.entity';
import { ShowcaseStatus } from '../showcase/showcase.dtos';
import { random, range } from 'lodash';

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
  showcase.expectedQuantity = random(100, 100000);

  const regular = faker.random.number({ min: 1000, max: 2000 }) * 1000,
    [pioneer, preorder, promo] = range(3)
      .map(() =>
        faker.random.number({
          min: 0.6,
          max: 0.95,
          precision: 0.01,
        }),
      )
      .sort()
      .map((p) => Math.round(p * regular));
  showcase.expectedSalePrice = {
    regular,
    pioneer,
    preorder,
    promo,
  };

  showcase.description = faker.lorem.paragraphs(4);

  return showcase;
});
