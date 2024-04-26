import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    StudentsModule,
    RouterModule.register([
      {
        path: 'api',
        children: [UsersModule, StudentsModule],
      },
    ]),
  ],
})
export class ApiModule {}
