import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAttendanceListsTable1716779537772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance_lists',
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
            name: 'school_day_id',
            type: 'uuid',
          },
          {
            name: 'student_id',
            type: 'uuid',
          },
          {
            name: 'attendance',
            type: 'boolean',
            default: false,
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
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['school_day_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'school_days',
            onDelete: 'CASCADE',
          }),
        ],
      }),
    );

    await queryRunner.query(
      'CREATE TRIGGER set_timestamp BEFORE UPDATE ON attendance_lists FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attendance_lists');
  }
}
