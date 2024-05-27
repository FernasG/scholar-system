import { Module } from '@nestjs/common';
import { SchoolDaysService } from './school-days.service';
import { SchoolDaysController } from './school-days.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolDays } from '@database';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolDays])],
  controllers: [SchoolDaysController],
  providers: [SchoolDaysService],
})
export class SchoolDaysModule {}
