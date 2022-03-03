import { MigrationInterface, QueryRunner } from 'typeorm';
import { slugify } from '@app/util';

export class brandShowcase1646290680928 implements MigrationInterface {
  name = 'brandShowcase1646290680928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const oldPairs = await queryRunner.query(`SELECT id,brand FROM showcase`);
    await Promise.all(
      oldPairs.map(async (p) => {
        const slug = slugify(p.brand.name);
        const [{ id }] = await queryRunner.query(
          `SELECT id FROM brand WHERE slug = '${slug}'`,
        );
        p.brand.id = id;
      }),
    );
    await queryRunner.query(
      `ALTER TABLE "showcase" DROP COLUMN "brand" CASCADE`,
    );
    await queryRunner.query(`ALTER TABLE "showcase" ADD "brandId" integer`);
    await queryRunner.query(
      `ALTER TABLE "showcase" ADD CONSTRAINT "FK_ee83a2a406b94c4ace1ed8a3109" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );

    for (const p of oldPairs) {
      await queryRunner.query(
        `UPDATE "showcase" SET "brandId" = ${p.brand.id} WHERE "id" = ${p.id}`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "showcase" DROP CONSTRAINT "FK_ee83a2a406b94c4ace1ed8a3109"`,
    );
    await queryRunner.query(`ALTER TABLE "showcase" DROP COLUMN "brandId"`);
    await queryRunner.query(
      `ALTER TABLE "showcase" ADD "brandId" jsonb NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "showcase" RENAME COLUMN "brandId" TO "brand"`,
    );
  }
}
