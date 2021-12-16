import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteAuthEntity1639578553935 implements MigrationInterface {
  name = 'deleteAuthEntity1639578553935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "showcase" DROP CONSTRAINT "FK_0d9e58c204ceb7b9e7c82353fa1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_07b601722fecec8fde42d282ce6"`,
    );
    // await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "authorUid"`);
    // await queryRunner.query(`--ALTER TABLE "showcase" ADD "authorUid" character varying NOT NULL`);
    // await queryRunner.query(`--ALTER TABLE "comment" DROP COLUMN "authorUid"`);
    // await queryRunner.query(`--ALTER TABLE "comment" ADD "authorUid" character varying NOT NULL`);
    await queryRunner.query(
      `CREATE INDEX "IDX_0d9e58c204ceb7b9e7c82353fa" ON "showcase" ("authorUid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_07b601722fecec8fde42d282ce" ON "comment" ("authorUid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_07b601722fecec8fde42d282ce"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0d9e58c204ceb7b9e7c82353fa"`,
    );
    // await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorUid"`);
    // await queryRunner.query(`ALTER TABLE "comment" ADD "authorUid" character varying(64)`);
    // await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "authorUid"`);
    // await queryRunner.query(`ALTER TABLE "showcase" ADD "authorUid" character varying(64)`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_07b601722fecec8fde42d282ce6" FOREIGN KEY ("authorUid") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "showcase" ADD CONSTRAINT "FK_0d9e58c204ceb7b9e7c82353fa1" FOREIGN KEY ("authorUid") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
