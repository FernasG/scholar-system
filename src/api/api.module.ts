import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { SchoolDaysModule } from './school-days/school-days.module';

@Module({
  imports: [
    UsersModule,
    ClassesModule,
    StudentsModule,
    SchoolDaysModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          UsersModule,
          ClassesModule,
          StudentsModule,
          SchoolDaysModule,
        ],
      },
    ]),
  ],
})
export class ApiModule {}
