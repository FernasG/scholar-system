import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAnnotationsTable1719777199855 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'annotations',
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
            name: 'text',
            type: 'text',
            isNullable: true,
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
      'CREATE TRIGGER set_timestamp BEFORE UPDATE ON annotations FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('annotations');
  }
}
