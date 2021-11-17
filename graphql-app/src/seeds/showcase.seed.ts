import { Factory, Seeder } from 'typeorm-seeding';
import { ShowcaseModel } from '../showcase/showcase.model';
import { Connection } from 'typeorm';

export default class ShowcaseSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(ShowcaseModel)().createMany(50);
  }
}
