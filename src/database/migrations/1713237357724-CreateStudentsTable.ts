import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStudentsTable1713237357724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isUnique: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'birthdate',
            type: 'date',
          },
          {
            name: 'gender',
            type: 'enum',
            enumName: 'STUDENT_GENDERS',
            enum: ['F', 'M'],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.query(
      'CREATE TRIGGER set_timestamp BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students');
  }
}
