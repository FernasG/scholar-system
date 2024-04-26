import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateClassDto, UpdateClassDto } from './classes.interface';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  public create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  public findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(+id, updateClassDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
