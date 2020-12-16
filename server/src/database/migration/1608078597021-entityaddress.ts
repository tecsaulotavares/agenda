import {MigrationInterface, QueryRunner} from "typeorm";

export class entityaddress1608078597021 implements MigrationInterface {
    name = 'entityaddress1608078597021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "neighborhood" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "zipCode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "neighborhood"`);
    }

}
