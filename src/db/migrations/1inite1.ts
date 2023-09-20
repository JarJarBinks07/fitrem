import { MigrationInterface, QueryRunner } from "typeorm";

export class Item1695050284142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "item" (
                "id" integer PRIMARY KEY NOT NULL,
                "isActive" boolean NOT NULL,
                "image" BLOB,
            )
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "item"
        `);
  }
}
