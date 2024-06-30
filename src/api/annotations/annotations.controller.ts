import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationsDto, UpdateAnnotationsDto } from './annotations.interface';

@Controller('annotations')
export class AnnotationsController {
  constructor(private readonly annotationsService: AnnotationsService) { }

  @Post()
  public async create(@Body() createAnnotationsDto: CreateAnnotationsDto) {
    return this.annotationsService.create(createAnnotationsDto);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateAnnotationsDto: UpdateAnnotationsDto) {
    return this.annotationsService.update(id, updateAnnotationsDto)
  }
}