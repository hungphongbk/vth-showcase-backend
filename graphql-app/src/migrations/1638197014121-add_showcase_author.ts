import { MigrationInterface, QueryRunner } from 'typeorm';

export class addShowcaseAuthor1638197014121 implements MigrationInterface {
  name = 'addShowcaseAuthor1638197014121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "showcase" ADD "authorId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `UPDATE TABLE "showcase" SET "authorId"="386pnR8ow4hJr7nl7bj92Txf2fn1"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "authorId"`);
  }
}
