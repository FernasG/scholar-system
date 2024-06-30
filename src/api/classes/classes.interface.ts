import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

class BaseClassDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  description: string;
}

export class CreateClassDto extends BaseClassDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}

export class UpdateClassDto extends PartialType(BaseClassDto) {}

export class FindAllClassesDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}

export class UpdateClassStudentsDto {
  @IsArray()
  @IsNotEmpty()
  students: string[]
}