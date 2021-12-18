import { MigrationInterface, QueryRunner } from 'typeorm';
import { InvestmentPackageEntity } from '../data-modules/investment/investment.package.entity';
import { InvestmentPackagesSeedData } from './seeds/investment-packages.seed-data';

export class seedInvestmentPackages1639835786635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = await queryRunner.connection.getRepository(
      InvestmentPackageEntity,
    );

    await repo.insert(InvestmentPackagesSeedData);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repo = await queryRunner.connection.getRepository(
      InvestmentPackageEntity,
    );

    await repo.clear();
  }
}
