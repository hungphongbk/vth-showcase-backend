import {MigrationInterface, QueryRunner} from "typeorm";

export class addPublishStatus1638163999021 implements MigrationInterface {
    name = 'addPublishStatus1638163999021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."showcase_publishstatus_enum" AS ENUM('draft', 'published')`);
        await queryRunner.query(`ALTER TABLE "showcase" ADD "publishStatus" "public"."showcase_publishstatus_enum" NOT NULL DEFAULT 'draft'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "publishStatus"`);
        await queryRunner.query(`DROP TYPE "public"."showcase_publishstatus_enum"`);
    }

}
