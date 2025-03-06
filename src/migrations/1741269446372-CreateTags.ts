import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTags1741269446372 implements MigrationInterface {
    name = 'CreateTags1741269446372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_98efc66e2a1ce7fa1425e21e468" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tag_entity"`);
    }

}
