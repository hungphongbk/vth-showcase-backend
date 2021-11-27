import {MigrationInterface, QueryRunner} from "typeorm";

export class expectedSalePriceOptional1638030083632 implements MigrationInterface {
    name = 'expectedSalePriceOptional1638030083632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" ALTER COLUMN "expectedSalePrice" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" ALTER COLUMN "expectedSalePrice" SET NOT NULL`);
    }

}
