import { MigrationInterface, QueryRunner } from 'typeorm';
import { ShowcaseEntity } from '../data-modules/showcase/entities/showcase.entity';
import { InvestmentPackageEntity } from '../data-modules/investment/investment.package.entity';
import { ShowcaseInvestPkgEntity } from '../data-modules/showcase-invest-pkg/showcase-invest-pkg.entity';

// import { ShowcaseQueryService } from '../data-modules/showcase/services/showcase-query.service';
//
export class refineShowcaseInvestPkg1652518792850
  implements MigrationInterface
{
  name = 'refineShowcaseInvestPkg1652518792850';
  // constructor(private readonly service: ShowcaseQueryService) {}
  public async up(queryRunner: QueryRunner): Promise<void> {
    //
    const showcases = await queryRunner.manager.find(ShowcaseEntity),
      defaultInvestPkgs = await queryRunner.manager.find(
        InvestmentPackageEntity,
      );
    await queryRunner.startTransaction();
    await Promise.all(
      showcases.map(async (showcase) => {
        await Promise.all(
          defaultInvestPkgs.map(async (pkg) => {
            const conn = new ShowcaseInvestPkgEntity();
            conn.showcase = showcase;
            conn.pkg = pkg;
            conn.benefitRate = pkg.benefitRate;
            conn.count = pkg.count;
            conn.fundedRate = pkg.fundedRate;
            await queryRunner.manager.save(conn);
          }),
        );
      }),
    );
    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
