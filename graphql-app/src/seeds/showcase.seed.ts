import { Factory, Seeder } from 'typeorm-seeding';
import { ShowcaseEntity } from '../data-modules/showcase/entities/showcase.entity';
import { Connection } from 'typeorm';
import { ShowcaseMediaEntity } from '../data-modules/showcase/entities/showcase.media.entity';
import { ShowcaseHFEntity } from '../data-modules/highlight-feature/entities/showcaseHF.entity';
import { ShowcaseHFMediaEntity } from '../data-modules/highlight-feature/entities/showcaseHF.media.entity';
import { random } from 'lodash';

export default class ShowcaseSeed implements Seeder {
  async seedHF(factory: Factory): Promise<ShowcaseHFEntity[]> {
    return await factory(ShowcaseHFEntity)()
      .map(async (hf) => {
        hf.image = await factory(ShowcaseHFMediaEntity)().create();
        return hf;
      })
      .createMany(random(2, 5));
  }

  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(ShowcaseEntity)()
      .map(async (showcase: ShowcaseEntity) => {
        showcase.image = await factory(ShowcaseMediaEntity)().create();
        showcase.highlightFeatures = await this.seedHF(factory);
        return showcase;
      })
      .createMany(random(20, 30));
  }
}
