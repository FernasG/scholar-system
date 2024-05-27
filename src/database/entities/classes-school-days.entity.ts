import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClassesSchoolDays {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  class_id: string;

  @Column({ type: 'uuid' })
  school_day: string;
}
