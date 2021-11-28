import {MigrationInterface, QueryRunner} from "typeorm";

export class makeSlugUnique1638098857457 implements MigrationInterface {
    name = 'makeSlugUnique1638098857457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d64668230aa248cdad4474ab5c"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d64668230aa248cdad4474ab5c" ON "showcase" ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d64668230aa248cdad4474ab5c"`);
        await queryRunner.query(`CREATE INDEX "IDX_d64668230aa248cdad4474ab5c" ON "showcase" ("slug") `);
    }

}
