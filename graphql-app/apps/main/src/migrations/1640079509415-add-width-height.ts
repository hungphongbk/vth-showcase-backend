import {MigrationInterface, QueryRunner} from "typeorm";

export class addWidthHeight1640079509415 implements MigrationInterface {
    name = 'addWidthHeight1640079509415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "width" integer`);
        await queryRunner.query(`ALTER TABLE "media" ADD "height" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "width"`);
    }

}
