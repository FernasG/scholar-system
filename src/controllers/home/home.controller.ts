import { Public } from '@guards';
import { Controller, Get, Render} from '@nestjs/common';

@Controller()
export class HomeController {
  
  @Get()
  @Public()
  @Render('Home')
  public async home() {
    return { message: 'string' };
  }

  @Get('signup')
  @Public()
  @Render('signup')
  public async signup() {
    return { message: 'string' };
  }
  
  //trocar
  @Get('dashboard')
  @Public()
  @Render('dashboard')
  public async dashboard() {
    return { message: 'string' };
  }

}