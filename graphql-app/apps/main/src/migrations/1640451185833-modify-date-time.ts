import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyDateTime1640451185833 implements MigrationInterface {
    name = 'modifyDateTime1640451185833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "expectedSaleAt"`);
        await queryRunner.query(`ALTER TABLE "showcase" ADD "expectedSaleAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "expectedSaleEndAt"`);
        await queryRunner.query(`ALTER TABLE "showcase" ADD "expectedSaleEndAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "expectedSaleEndAt"`);
        await queryRunner.query(`ALTER TABLE "showcase" ADD "expectedSaleEndAt" date`);
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "expectedSaleAt"`);
        await queryRunner.query(`ALTER TABLE "showcase" ADD "expectedSaleAt" date`);
    }

}
