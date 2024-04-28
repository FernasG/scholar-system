import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [
    UsersModule,
    ClassesModule,
    StudentsModule,
    RouterModule.register([
      {
        path: 'api',
        children: [UsersModule, ClassesModule, StudentsModule],
      },
    ]),
  ],
})
export class ApiModule {}
