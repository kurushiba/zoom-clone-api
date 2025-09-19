import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMeeting1757720651891 implements MigrationInterface {
    name = 'CreateMeeting1757720651891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_meeting" ("id" varchar PRIMARY KEY NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_meeting"("id", "isActive", "createdAt", "updatedAt") SELECT "id", "isActive", "createdAt", "updatedAt" FROM "meeting"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
        await queryRunner.query(`ALTER TABLE "temporary_meeting" RENAME TO "meeting"`);
        await queryRunner.query(`CREATE TABLE "temporary_meeting" ("id" varchar PRIMARY KEY NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_meeting"("id", "isActive", "createdAt", "updatedAt") SELECT "id", "isActive", "createdAt", "updatedAt" FROM "meeting"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
        await queryRunner.query(`ALTER TABLE "temporary_meeting" RENAME TO "meeting"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting" RENAME TO "temporary_meeting"`);
        await queryRunner.query(`CREATE TABLE "meeting" ("id" varchar PRIMARY KEY NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "meeting"("id", "isActive", "createdAt", "updatedAt") SELECT "id", "isActive", "createdAt", "updatedAt" FROM "temporary_meeting"`);
        await queryRunner.query(`DROP TABLE "temporary_meeting"`);
        await queryRunner.query(`ALTER TABLE "meeting" RENAME TO "temporary_meeting"`);
        await queryRunner.query(`CREATE TABLE "meeting" ("id" varchar PRIMARY KEY NOT NULL, "hostId" varchar NOT NULL, "title" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "meeting"("id", "isActive", "createdAt", "updatedAt") SELECT "id", "isActive", "createdAt", "updatedAt" FROM "temporary_meeting"`);
        await queryRunner.query(`DROP TABLE "temporary_meeting"`);
    }

}
