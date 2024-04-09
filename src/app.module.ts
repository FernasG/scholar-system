import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ControllersModule } from './controllers/controllers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    ApiModule,
    ControllersModule,
  ],
})
export class AppModule {}
