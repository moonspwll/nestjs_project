import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameToUsers1741276480306 implements MigrationInterface {
    name = 'AddUsernameToUsers1741276480306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
