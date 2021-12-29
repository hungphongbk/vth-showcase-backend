import {MigrationInterface, QueryRunner} from "typeorm";

export class addShowcaseFeatured1640779557857 implements MigrationInterface {
    name = 'addShowcaseFeatured1640779557857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" ADD "isFeatured" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "isFeatured"`);
    }

}
