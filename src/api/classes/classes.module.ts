import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Classes } from '@database';

@Module({
  imports: [TypeOrmModule.forFeature([Classes])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
