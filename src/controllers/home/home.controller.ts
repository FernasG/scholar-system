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
  @Render('SignUp')
  public async signup() {
    return {};
  }

  @Get('dashboard')
  @Render('Dashboard')
  public async dashboard() {
    return {};
  }

  @Get('students')
  @Render('Students')
  public async students() {
    return {};
  }

  @Get('classes')
  @Render('Classes')
  public async classes() {
    return {};
  }
}
