import {MigrationInterface, QueryRunner} from "typeorm";

export class addShowcaseViewcountColumn1644227122373 implements MigrationInterface {
    name = 'addShowcaseViewcountColumn1644227122373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" ADD "viewCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "viewCount"`);
    }

}
