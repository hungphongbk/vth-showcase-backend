import { MigrationInterface, QueryRunner } from 'typeorm';
import { slugify } from '@app/util';

export class brandInit1646223022842 implements MigrationInterface {
  name = 'brandInit1646223022842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "subtitle" character varying NOT NULL, "description" character varying NOT NULL, "logo" character varying, "metadata" json, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f4436285f5d5785c7fb0b28b30" ON "brand" ("slug") `,
    );
    await queryRunner.query(`ALTER TABLE "media" ADD "brandId" integer`);
    await queryRunner.query(
      `ALTER TYPE "public"."media_type_enum" RENAME TO "media_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."media_type_enum" AS ENUM('0', '1', '2', '3')`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ALTER COLUMN "type" TYPE "public"."media_type_enum" USING "type"::"text"::"public"."media_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."media_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_0ccaec7aff58fd3c149a1d488e0" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    // merge data
    const oldBrands = await queryRunner.query(`SELECT brand FROM showcase`);
    for (const brand of oldBrands) {
      const slugified = slugify(brand.brand.name);
      const check = await queryRunner.query(
        `SELECT * FROM brand WHERE slug = '${slugified}'`,
      );
      if (check.length === 0) {
        await queryRunner.query(
          `INSERT INTO brand (slug,name,subtitle,description) VALUES ('${slugified}','${brand.brand.name}','${brand.brand.name}','${brand.brand.description}')`,
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_0ccaec7aff58fd3c149a1d488e0"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."media_type_enum_old" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ALTER COLUMN "type" TYPE "public"."media_type_enum_old" USING "type"::"text"::"public"."media_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."media_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."media_type_enum_old" RENAME TO "media_type_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "brandId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f4436285f5d5785c7fb0b28b30"`,
    );
    await queryRunner.query(`DROP TABLE "brand"`);
  }
}
