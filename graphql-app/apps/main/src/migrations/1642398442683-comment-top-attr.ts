import {MigrationInterface, QueryRunner} from "typeorm";

export class commentTopAttr1642398442683 implements MigrationInterface {
    name = 'commentTopAttr1642398442683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "isTopComment" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "isTopComment"`);
    }

}
