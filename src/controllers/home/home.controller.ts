import { Controller, Get, Render } from '@nestjs/common';
import { Public } from '@guards';

@Controller()
export class HomeController {
  @Get()
  @Public()
  @Render('Home')
  public async home() {
    return;
  }

  @Get('dashboard')
  @Render('Dashboard')
  public async dashboard() {
    return;
  }
}
