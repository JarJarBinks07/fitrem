import { MigrationInterface, QueryRunner } from "typeorm";

export class Item31695050284142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "item" ADD  "name" varchar
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "item" DROP COLUMN  "name"
        `);
  }
}