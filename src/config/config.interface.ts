import { DataSourceOptions } from 'typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface Configuration {
  database: DataSourceOptions;
  jwt_options: JwtModuleOptions;
}
