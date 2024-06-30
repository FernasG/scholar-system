import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { ClassesModule } from './classes/classes.module';
import { SchoolDaysModule } from './school-days/school-days.module';

@Module({
  imports: [HomeModule, ClassesModule, SchoolDaysModule],
})
export class ControllersModule { }
