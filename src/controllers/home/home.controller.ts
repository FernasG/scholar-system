import { Public } from '@guards';
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  @Public()
  @Render('Home')
  public async home() {
    return { message: 'string' };
  }
}
