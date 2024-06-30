import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CreateClassDto, UpdateClassDto, FindAllClassesDto, UpdateClassStudentsDto } from './classes.interface';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  public create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  public findAll(@Query() findAllClassesDto: FindAllClassesDto) {
    return this.classesService.findAll(findAllClassesDto);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @Put(':id/students')
  public updateStudents(@Param('id') id: string, @Body() updateClassStudentsDto: UpdateClassStudentsDto) {
    return this.classesService.updateStudents(id, updateClassStudentsDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }
}
