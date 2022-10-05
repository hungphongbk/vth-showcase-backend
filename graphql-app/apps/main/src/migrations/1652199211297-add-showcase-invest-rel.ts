import { MigrationInterface, QueryRunner } from 'typeorm';

export class addShowcaseInvestRel1652199211297 implements MigrationInterface {
  name = 'addShowcaseInvestRel1652199211297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
            CREATE TABLE "showcase_invest_pkg_entity" (
                "pkgId" integer NOT NULL,
                "showcaseId" integer NOT NULL,
                "fundedRate" integer,
                "count" integer,
                "benefitRate" integer,
                CONSTRAINT "PK_9baf70a8d688e9d18cb2d676803" PRIMARY KEY ("pkgId", "showcaseId")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "showcase_invest_pkg_entity"
            ADD CONSTRAINT "FK_d740a06101fc4b2ee8fadbe31b8" FOREIGN KEY ("pkgId") REFERENCES "investmentPackage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "showcase_invest_pkg_entity"
            ADD CONSTRAINT "FK_946065c8038bb2f728c555296e2" FOREIGN KEY ("showcaseId") REFERENCES "showcase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`DROP VIEW IF EXISTS "showcase_view_entity"`);
    await queryRunner.query(`
            CREATE VIEW "showcase_view_entity" AS
            SELECT *,
                (
                    SELECT count("comment"."id") AS "commentCount"
                    FROM "comment" "comment"
                    WHERE "comment"."showcaseId" = "showcase"."id"
                ) AS "commentCount",
                (
                    SELECT count("preorder"."id") AS "preorderCount"
                    FROM "preorder" "preorder"
                    WHERE "preorder"."showcaseId" = "showcase"."id"
                )
            FROM "showcase" "showcase"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP VIEW "showcase_view_entity"
        `);
    await queryRunner.query(`
            ALTER TABLE "showcase_invest_pkg_entity" DROP CONSTRAINT "FK_946065c8038bb2f728c555296e2"
        `);
    await queryRunner.query(`
            ALTER TABLE "showcase_invest_pkg_entity" DROP CONSTRAINT "FK_d740a06101fc4b2ee8fadbe31b8"
        `);
    await queryRunner.query(`
            DROP TABLE "showcase_invest_pkg_entity"
        `);
  }
}
