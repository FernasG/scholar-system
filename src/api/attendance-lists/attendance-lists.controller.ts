import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AttendanceListsService } from './attendance-lists.service';
import {
  CreateAttendanceListDto,
  FindAllAttendanceListsDto,
  UpdateAttendanceListDto,
} from './attendance-lists.interface';

@Controller('attendance-lists')
export class AttendanceListsController {
  constructor(
    private readonly attendanceListsService: AttendanceListsService,
  ) {}

  @Post()
  public async create(
    @Body() createAttendanceListDto: CreateAttendanceListDto,
  ) {
    return this.attendanceListsService.create(createAttendanceListDto);
  }

  @Get()
  public async findAll(
    @Query() fnindAllAttendanceListsDto: FindAllAttendanceListsDto,
  ) {
    return this.attendanceListsService.findAll(fnindAllAttendanceListsDto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.attendanceListsService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateAttendanceListDto: UpdateAttendanceListDto,
  ) {
    return this.attendanceListsService.update(id, updateAttendanceListDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.attendanceListsService.remove(id);
  }
}
