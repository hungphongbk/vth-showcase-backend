import {MigrationInterface, QueryRunner} from "typeorm";

export class showcaseView1642233112070 implements MigrationInterface {
    name = 'showcaseView1642233112070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW "showcase_view_entity" AS SELECT *, (SELECT count("comment"."id") AS "commentCount" FROM "comment" "comment" WHERE "comment"."showcaseId" = "showcase"."id") AS "commentCount", (SELECT count("preorder"."id") AS "preorderCount" FROM "preorder" "preorder" WHERE "preorder"."showcaseId" = "showcase"."id") FROM "showcase" "showcase"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","showcase_view_entity","SELECT *, (SELECT count(\"comment\".\"id\") AS \"commentCount\" FROM \"comment\" \"comment\" WHERE \"comment\".\"showcaseId\" = \"showcase\".\"id\") AS \"commentCount\", (SELECT count(\"preorder\".\"id\") AS \"preorderCount\" FROM \"preorder\" \"preorder\" WHERE \"preorder\".\"showcaseId\" = \"showcase\".\"id\") FROM \"showcase\" \"showcase\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","showcase_view_entity","public"]);
        await queryRunner.query(`DROP VIEW "showcase_view_entity"`);
    }

}
