import { MigrationInterface, QueryRunner } from 'typeorm';

export class addShowcaseViewcountViewentity1644242436777
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS "showcase_view_entity"`);
    await queryRunner.query(
      `CREATE OR REPLACE VIEW "showcase_view_entity" AS SELECT *, (SELECT count("comment"."id") AS "commentCount" FROM "comment" "comment" WHERE "comment"."showcaseId" = "showcase"."id") AS "commentCount", (SELECT count("preorder"."id") AS "preorderCount" FROM "preorder" "preorder" WHERE "preorder"."showcaseId" = "showcase"."id") FROM "showcase" "showcase"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // nothing here
  }
}
