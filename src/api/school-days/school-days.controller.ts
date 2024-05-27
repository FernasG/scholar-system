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
import { SchoolDaysService } from './school-days.service';
import {
  CreateSchoolDayDto,
  FindAllSchoolDaysDto,
  UpdateSchoolDayDto,
} from './school-days.interface';

@Controller('school-days')
export class SchoolDaysController {
  constructor(private readonly schoolDaysService: SchoolDaysService) {}

  @Post()
  public async create(@Body() createSchoolDayDto: CreateSchoolDayDto) {
    return this.schoolDaysService.create(createSchoolDayDto);
  }

  @Get()
  public async findAll(@Query() findAllSchoolDaysDto: FindAllSchoolDaysDto) {
    return this.schoolDaysService.findAll(findAllSchoolDaysDto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.schoolDaysService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateSchoolDayDto: UpdateSchoolDayDto,
  ) {
    return this.schoolDaysService.update(id, updateSchoolDayDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.schoolDaysService.remove(id);
  }
}
