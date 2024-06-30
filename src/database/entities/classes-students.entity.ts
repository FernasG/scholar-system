import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClassesStudents {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  class_id: string;

  @Column({ type: 'uuid' })
  student_id: string;
}