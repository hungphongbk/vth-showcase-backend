import {MigrationInterface, QueryRunner} from "typeorm";

export class addPrjUpdateData1640465167483 implements MigrationInterface {
    name = 'addPrjUpdateData1640465167483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PrjUpdate" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "showcaseId" integer, CONSTRAINT "PK_57f4bce52af41775bc040082022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "PrjUpdate" ADD CONSTRAINT "FK_fb92eeef4c3ee4eab72c282cffe" FOREIGN KEY ("showcaseId") REFERENCES "showcase"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PrjUpdate" DROP CONSTRAINT "FK_fb92eeef4c3ee4eab72c282cffe"`);
        await queryRunner.query(`DROP TABLE "PrjUpdate"`);
    }

}
