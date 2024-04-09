import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [ApiModule, ControllersModule],
})
export class AppModule {}
