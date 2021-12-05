import {MigrationInterface, QueryRunner} from "typeorm";

export class convertQuantity1638682144742 implements MigrationInterface {
    name = 'convertQuantity1638682144742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "expectedQuantity"`);
        await queryRunner.query(`ALTER TABLE "showcase" ADD "expectedQuantity" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "expectedQuantity"`);
        await queryRunner.query(`ALTER TABLE "showcase" ADD "expectedQuantity" integer NOT NULL`);
    }

}
