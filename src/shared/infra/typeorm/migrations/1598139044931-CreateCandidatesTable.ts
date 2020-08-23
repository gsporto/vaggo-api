import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCandidatesTable1598139044931
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidates',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'age',
            type: 'int',
          },
          {
            name: 'linkedin',
            type: 'varchar',
          },
          {
            name: 'techs',
            type: 'enum',
            enumName: 'techs',
            enum: [
              'C#',
              'Javascript',
              'Nodejs',
              'Angular',
              'React',
              'Ionic',
              'Mensageria',
              'PHP',
              'Laravel',
            ],
            isArray: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('candidates');
  }
}
