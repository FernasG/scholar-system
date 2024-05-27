import { Public } from '@guards';
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  @Public()
  @Render('Home')
  public async home() {
    return;
  }

  @Get('signup')
  @Public()
  @Render('signup')
  public async signup() {
    return { message: 'string' };
  }

  @Get('dashboard')
  @Public()
  @Render('dashboard')
  public async dashboard() {
    return { message: 'string' };
  }
}
