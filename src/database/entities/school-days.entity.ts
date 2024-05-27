import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SchoolDays {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'smallint', unsigned: true })
  day: number;

  @Column({ type: 'smallint', unsigned: true })
  month: number;

  @Column({ type: 'integer', unsigned: true })
  year: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'uuid' })
  class_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
