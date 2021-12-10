import { MigrationInterface, QueryRunner } from 'typeorm';
import connectionOptions from '../ormconfig';

const databaseName = connectionOptions.database as string;

export class initializeDb1639128987696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(databaseName, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase(databaseName, true);
  }
}
