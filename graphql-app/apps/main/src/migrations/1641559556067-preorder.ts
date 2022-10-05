import {MigrationInterface, QueryRunner} from "typeorm";

export class preorder1641559556067 implements MigrationInterface {
    name = 'preorder1641559556067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "preorder" ("authorUid" character varying NOT NULL, "id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "showcaseId" integer, CONSTRAINT "PK_5e09a1db23df5f052be842b9c39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_250b97299c10c13002561ee582" ON "preorder" ("authorUid") `);
        await queryRunner.query(`ALTER TABLE "preorder" ADD CONSTRAINT "FK_703b47bb1b089e51417078b4510" FOREIGN KEY ("showcaseId") REFERENCES "showcase"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preorder" DROP CONSTRAINT "FK_703b47bb1b089e51417078b4510"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_250b97299c10c13002561ee582"`);
        await queryRunner.query(`DROP TABLE "preorder"`);
    }

}
