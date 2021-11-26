import { Factory, Seeder } from 'typeorm-seeding';
import { ShowcaseEntity } from '../showcase/entities/showcase.entity';
import { Connection } from 'typeorm';
import { MediaModel } from '../media/media.model';

export default class ShowcaseSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(ShowcaseEntity)()
      .map(async (showcase: ShowcaseEntity) => {
        showcase.media = {
          image: await factory(MediaModel)().create(),
        };
        return showcase;
      })
      .createMany(150);
  }
}
