import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

class BaseClassDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

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
