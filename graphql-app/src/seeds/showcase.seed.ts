import { Factory, Seeder } from 'typeorm-seeding';
import { ShowcaseModel } from '../showcase/showcase.model';
import { Connection } from 'typeorm';
import { MediaModel } from '../media/media.model';

export default class ShowcaseSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(ShowcaseModel)()
      .map(async (showcase: ShowcaseModel) => {
        const media = await factory(MediaModel)().create();
        showcase.image = media;
        return showcase;
      })
      .createMany(50);
  }
}
