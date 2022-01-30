import { Command, CommandRunner } from 'nest-commander';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowcaseEntity } from 'apps/main/src/data-modules/showcase/entities/showcase.entity';
import { Repository } from 'typeorm';

@Command({
  name: 'remove-ci',
})
export class RemoveCiCommand implements CommandRunner {
  constructor(
    @InjectRepository(ShowcaseEntity)
    private readonly repo: Repository<ShowcaseEntity>,
  ) {}
  async run(passedParams: string[], options?: Record<string, any>) {
    await this.repo
      .createQueryBuilder()
      .delete()
      .where(`slug LIKE 'ci-test%'`)
      .execute();
    process.exit();
  }
}
