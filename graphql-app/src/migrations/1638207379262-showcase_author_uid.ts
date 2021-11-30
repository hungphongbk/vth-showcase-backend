import {MigrationInterface, QueryRunner} from "typeorm";

export class showcaseAuthorUid1638207379262 implements MigrationInterface {
    name = 'showcaseAuthorUid1638207379262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" ADD "authorId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "authorId"`);
    }

}
