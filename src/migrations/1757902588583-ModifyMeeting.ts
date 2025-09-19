import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyMeeting1757902588583 implements MigrationInterface {
    name = 'ModifyMeeting1757902588583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_meeting" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_meeting"("id", "createdAt", "updatedAt") SELECT "id", "createdAt", "updatedAt" FROM "meeting"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
        await queryRunner.query(`ALTER TABLE "temporary_meeting" RENAME TO "meeting"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting" RENAME TO "temporary_meeting"`);
        await queryRunner.query(`CREATE TABLE "meeting" ("id" varchar PRIMARY KEY NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "meeting"("id", "createdAt", "updatedAt") SELECT "id", "createdAt", "updatedAt" FROM "temporary_meeting"`);
        await queryRunner.query(`DROP TABLE "temporary_meeting"`);
    }

}
