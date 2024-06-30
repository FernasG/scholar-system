import { Controller, Get, Param, Render, Req } from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller()
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @Get('classes')
  @Render('Classes')
  public async classes(@Req() req: any) {
    return this.classesService.classes(req.user);
  }

  @Get('classes/:id')
  @Render('Class')
  public async classroom(@Req() req: any, @Param('id') id: string) {
    return this.classesService.classroom(req.user, id);
  }
}