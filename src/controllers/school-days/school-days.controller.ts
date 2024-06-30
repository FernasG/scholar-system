import { Controller, Get, Param, Render } from '@nestjs/common';
import { SchoolDaysService } from './school-days.service';

@Controller()
export class SchoolDaysController {
  constructor(private readonly schoolDaysService: SchoolDaysService) { }

  @Get('school-days/:id')
  @Render('SchoolDay')
  public async schoolday(@Param('id') id: string) {
    return this.schoolDaysService.schoolday(id);
  }
}