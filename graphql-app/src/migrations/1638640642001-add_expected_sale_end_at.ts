import {MigrationInterface, QueryRunner} from "typeorm";

export class addExpectedSaleEndAt1638640642001 implements MigrationInterface {
    name = 'addExpectedSaleEndAt1638640642001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" ADD "expectedSaleEndAt" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "expectedSaleEndAt"`);
    }

}
