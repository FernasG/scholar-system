import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Classes, Students } from '@database';

@Injectable()
export class ClassesService {
  constructor(private readonly datasource: DataSource) { }

  public async classes(user: { id: string }) {
    const { id: user_id } = user;

    const classes = await this.datasource
      .getRepository(Classes)
      .find({ where: { user_id } });

    return { classes: this.toRow(classes) };
  }

  public async classroom(user: { id: string }, id: string) {
    const { id: user_id } = user;

    const classroom = await this.datasource
      .getRepository(Classes)
      .findOne({
        where: { id, user_id },
        relations: { students: true, school_days: true }
      });

    if (!classroom) throw new NotFoundException();

    const students = await this.datasource
      .getRepository(Students)
      .find();

    const classStudents = classroom.students.map(({ id: studentId }) => studentId);

    const studentsList = students.map((student) => {
      const isClassStudent = classStudents.includes(student.id);

      return Object.assign({ checked: isClassStudent }, student);
    });

    return { class: classroom, students: studentsList };
  }

  private toRow(classes: Classes[]) {
    const response: Classes[][] = [];

    for (let i = 0; i < classes.length; i += 4) {
      response.push(classes.slice(i, i + 4));
    }

    return response;
  }
}