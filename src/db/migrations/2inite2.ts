import { MigrationInterface, QueryRunner } from "typeorm";

export class Item21695050284142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "test" ADD  "isActive2" boolean
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "test" DROP COLUMN  "isActive2"
        `);
  }
}
