import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Students } from './students.entity';
import { SchoolDays } from './school-days.entity';

@Entity()
export class Classes {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: '256' })
  name: string;

  @Column({ type: 'varchar', length: '256' })
  description: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => Users, (user) => user.classes)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToMany(() => Students)
  @JoinTable({
    name: 'classes_students',
    joinColumn: { name: 'class_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
  })
  students: Students[];

  @OneToMany(() => SchoolDays, (schoolDays) => schoolDays.classroom)
  @JoinColumn({ name: 'class_id' })
  school_days: SchoolDays[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
