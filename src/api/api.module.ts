import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { SchoolDaysModule } from './school-days/school-days.module';
import { AttendanceListsModule } from './attendance-lists/attendance-lists.module';
import { AnnotationsModule } from './annotations/annotations.module';

@Module({
  imports: [
    UsersModule,
    ClassesModule,
    StudentsModule,
    SchoolDaysModule,
    AnnotationsModule,
    AttendanceListsModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          UsersModule,
          ClassesModule,
          StudentsModule,
          SchoolDaysModule,
          AnnotationsModule,
          AttendanceListsModule,
        ],
      },
    ]),
  ],
})
export class ApiModule {}
