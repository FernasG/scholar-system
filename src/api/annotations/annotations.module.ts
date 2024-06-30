import { Module } from '@nestjs/common';
import { AnnotationsController } from './annotations.controller';
import { AnnotationsService } from './annotations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annotations } from '@database';

@Module({
  imports: [TypeOrmModule.forFeature([Annotations])],
  providers: [AnnotationsService],
  controllers: [AnnotationsController]
})
export class AnnotationsModule { }