import { PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: string;

  @IsString()
  @IsIn(['F', 'M'])
  gender: string;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
