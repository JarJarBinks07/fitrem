import { MigrationInterface, QueryRunner } from "typeorm";

export class Item1695050284142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "test" (
                "id" integer PRIMARY KEY NOT NULL,
                "isActive" boolean NOT NULL,
                "file" blob NOT NULL
            )
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "test"
        `);
  }
}
