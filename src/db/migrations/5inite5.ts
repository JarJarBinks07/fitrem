import { MigrationInterface, QueryRunner } from "typeorm";

export class Item1695471857674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "state" (
                "id" integer PRIMARY KEY NOT NULL,
                "store" text NOT NULL
            )
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "state"
        `);
  }
}
