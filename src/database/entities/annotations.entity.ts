import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SchoolDays } from './school-days.entity';

@Entity()
export class Annotations {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  school_day_id: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @OneToOne(() => SchoolDays, (schoolDay) => schoolDay.attendance_lists)
  @JoinColumn({ name: 'school_day_id' })
  school_day: SchoolDays;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
