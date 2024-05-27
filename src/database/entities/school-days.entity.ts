import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttendanceLists } from './attendance-lists.entity';

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

  @OneToMany(() => AttendanceLists, (attendanceLists) => attendanceLists.school_day)
  @JoinColumn({ name: 'school_day_id' })
  attendance_lists: AttendanceLists;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
