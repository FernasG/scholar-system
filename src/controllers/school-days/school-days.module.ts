import { Module } from '@nestjs/common';
import { SchoolDaysController } from './school-days.controller';
import { SchoolDaysService } from './school-days.service';

@Module({
  controllers: [SchoolDaysController],
  providers: [SchoolDaysService]
})
export class SchoolDaysModule { }