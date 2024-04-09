import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  @Render('Home')
  public async home() {
    return { message: 'string' };
  }
}
