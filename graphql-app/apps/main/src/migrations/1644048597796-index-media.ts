import {MigrationInterface, QueryRunner} from "typeorm";

export class indexMedia1644048597796 implements MigrationInterface {
    name = 'indexMedia1644048597796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_3de002b2c50816776d2e11f0f1" ON "media" ("showcaseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_044aaee047a52bee8b69b3fd86" ON "media" ("hfId") `);
        await queryRunner.query(`CREATE INDEX "IDX_89036447c82b522dc27296a124" ON "media" ("listId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_89036447c82b522dc27296a124"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_044aaee047a52bee8b69b3fd86"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3de002b2c50816776d2e11f0f1"`);
    }

}
