import {MigrationInterface, QueryRunner} from "typeorm";


export class AddTsdSchema1561991006215 implements MigrationInterface {
  public schemaName = "test";

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropSchema(this.schemaName);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createSchema(this.schemaName, true);
  }
}
