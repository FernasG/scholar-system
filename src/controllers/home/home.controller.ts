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
    return { message: 'string' };
  }

  @Get('dashboard')
  @Public()
  @Render('Dashboard')
  public async dashboard() {
    return { message: 'string' };
  }

  @Get('students')
  @Public()
  @Render('Students')
  public async students() {
    return { message: 'string' };
  }

  @Get('classes')
  @Public()
  @Render('Classes')
  public async classes() {
    return { message: 'string' };
  }

  @Get('profile')
  @Public()
  @Render('Profile')
  public async profile() {
    return { message: 'string' };
  }
}
