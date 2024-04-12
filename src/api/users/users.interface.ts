import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export const ENCRYPT_SALT_ROUNDS = 10;

class UserDefaultDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}

export class CreateUserDto extends UserDefaultDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateUserDto extends PartialType(UserDefaultDto) {}
