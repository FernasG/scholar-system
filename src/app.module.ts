import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { ControllersModule } from './controllers/controllers.module';
import { ApiModule } from './api/api.module';
import { AuthenticationModule } from '@authentication';
import configuration from '@config/configuration';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'pt_BR',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    AuthenticationModule,
    ControllersModule,
    ApiModule,
  ],
})
export class AppModule {}
