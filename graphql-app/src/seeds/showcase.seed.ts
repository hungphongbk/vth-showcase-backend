import { Factory, Seeder } from 'typeorm-seeding';
import { ShowcaseEntity } from '../showcase/showcase.entity';
import { Connection } from 'typeorm';
import { MediaEntity } from '../media/media.entity';

export default class ShowcaseSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(ShowcaseEntity)()
      .map(async (showcase: ShowcaseEntity) => {
        const media = await factory(MediaEntity)().create();
        showcase.image = media;
        return showcase;
      })
      .createMany(50);
  }
}
