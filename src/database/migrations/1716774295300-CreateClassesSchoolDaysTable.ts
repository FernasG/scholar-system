import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClassesSchoolDaysTable1716774295300
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classes_school_days',
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
            name: 'class_id',
            type: 'uuid',
          },
          {
            name: 'school_day_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['class_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'classes',
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['school_day_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'school_days',
            onDelete: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('classes_school_days');
  }
}
