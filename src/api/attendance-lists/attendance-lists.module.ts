import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceListsService } from './attendance-lists.service';
import { AttendanceListsController } from './attendance-lists.controller';
import { AttendanceLists } from '@database';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceLists])],
  controllers: [AttendanceListsController],
  providers: [AttendanceListsService],
})
export class AttendanceListsModule {}
