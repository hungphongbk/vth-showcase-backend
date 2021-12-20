import {MigrationInterface, QueryRunner} from "typeorm";

export class mediaPreviewField1639999115367 implements MigrationInterface {
    name = 'mediaPreviewField1639999115367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "preloadUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "preloadUrl"`);
    }

}
