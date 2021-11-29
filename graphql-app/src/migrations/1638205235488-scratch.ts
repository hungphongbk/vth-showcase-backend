import { MigrationInterface, QueryRunner } from 'typeorm';

export class scratch1638205235488 implements MigrationInterface {
  name = 'scratch1638205235488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."media_type_enum" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "filename" character varying NOT NULL, "path" character varying NOT NULL, "mimetype" character varying NOT NULL, "type" "public"."media_type_enum" NOT NULL, "showcaseId" integer, "listId" integer, "hfId" integer, CONSTRAINT "REL_3de002b2c50816776d2e11f0f1" UNIQUE ("showcaseId"), CONSTRAINT "REL_044aaee047a52bee8b69b3fd86" UNIQUE ("hfId"), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_637a0dd7f9068a9ca80decee00" ON "media" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "imageList" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "showcaseId" integer, CONSTRAINT "PK_79c804e1be18e8b55b58860266a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."showcase_status_enum" AS ENUM('coming soon', 'idea', 'showcase')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."showcase_publishstatus_enum" AS ENUM('draft', 'published')`,
    );
    await queryRunner.query(
      `CREATE TABLE "showcase" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "author" character varying NOT NULL, "brand" jsonb NOT NULL, "status" "public"."showcase_status_enum" NOT NULL DEFAULT 'showcase', "publishStatus" "public"."showcase_publishstatus_enum" NOT NULL DEFAULT 'draft', "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "expectedSaleAt" date, "expectedQuantity" integer NOT NULL, "expectedSalePrice" jsonb, CONSTRAINT "PK_cacb526c9c1e4a9e9db58879955" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d64668230aa248cdad4474ab5c" ON "showcase" ("slug") `,
    );
    await queryRunner.query(
      `CREATE TABLE "showcaseHighlightFeature" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "showcaseId" integer, CONSTRAINT "PK_694ef0a8e2e001f603774d6b445" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_3de002b2c50816776d2e11f0f14" FOREIGN KEY ("showcaseId") REFERENCES "showcase"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_89036447c82b522dc27296a1242" FOREIGN KEY ("listId") REFERENCES "imageList"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_044aaee047a52bee8b69b3fd867" FOREIGN KEY ("hfId") REFERENCES "showcaseHighlightFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "imageList" ADD CONSTRAINT "FK_77bf5000a94278ec58e9fcdf05c" FOREIGN KEY ("showcaseId") REFERENCES "showcase"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "showcaseHighlightFeature" ADD CONSTRAINT "FK_b3ed0a0cdefa5175c00a798e294" FOREIGN KEY ("showcaseId") REFERENCES "showcase"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "showcaseHighlightFeature" DROP CONSTRAINT "FK_b3ed0a0cdefa5175c00a798e294"`,
    );
    await queryRunner.query(
      `ALTER TABLE "imageList" DROP CONSTRAINT "FK_77bf5000a94278ec58e9fcdf05c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_044aaee047a52bee8b69b3fd867"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_89036447c82b522dc27296a1242"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_3de002b2c50816776d2e11f0f14"`,
    );
    await queryRunner.query(`DROP TABLE "showcaseHighlightFeature"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d64668230aa248cdad4474ab5c"`,
    );
    await queryRunner.query(`DROP TABLE "showcase"`);
    await queryRunner.query(`DROP TYPE "public"."showcase_publishstatus_enum"`);
    await queryRunner.query(`DROP TYPE "public"."showcase_status_enum"`);
    await queryRunner.query(`DROP TABLE "imageList"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_637a0dd7f9068a9ca80decee00"`,
    );
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TYPE "public"."media_type_enum"`);
  }
}
