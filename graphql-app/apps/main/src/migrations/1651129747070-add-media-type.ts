import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMediaType1651129747070 implements MigrationInterface {
  name = 'addMediaType1651129747070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."media_formattype_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD "formatType" "public"."media_formattype_enum" NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "formatType"`);
    await queryRunner.query(`DROP TYPE "public"."media_formattype_enum"`);
  }
}
