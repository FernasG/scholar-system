import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class SchoolDaysController {
  @Get('school-days/:id')
  @Render('SchoolDay')
  public async classroom() {
    return {};
  }
}