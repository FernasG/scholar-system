import { SchoolDays, Students } from '@database';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, In } from 'typeorm';

@Injectable()
export class SchoolDaysService {
  constructor(private readonly datasource: DataSource) { }

  public async schoolday(id: string) {
    const schoolDay = await this.datasource
      .getRepository(SchoolDays)
      .findOne({
        where: { id },
        relations: { attendance_lists: true },
        order: { attendance_lists: { created_at: 'ASC' } }
      });

    if (!schoolDay) throw new InternalServerErrorException();

    const { attendance_lists } = schoolDay;
    const response = Object.assign({}, schoolDay);

    if (attendance_lists && attendance_lists.length) {
      const studentsIds = attendance_lists.map(({ student_id }) => student_id);

      const students = await this.datasource
        .getRepository(Students)
        .find({ where: { id: In(studentsIds) }, select: ['id', 'name'] });

      const attendanceList = attendance_lists.map(item => {
        const student = students.find(({ id }) => item.student_id === id);

        return Object.assign({ student_name: student?.name }, item);
      });

      const sortedList = attendanceList.sort((a, b) => {
        if (a.student_name < b.student_name) return -1;
        if (a.student_name > b.student_name) return 1;
        return 0;
      });

      response.attendance_lists = sortedList;
    }

    return { school_day: response };
  }
}