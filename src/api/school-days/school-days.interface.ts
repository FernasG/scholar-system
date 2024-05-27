import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

class BaseSchoolDayDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;
}

export class CreateSchoolDayDto extends BaseSchoolDayDto {
  @IsUUID()
  @IsNotEmpty()
  class_id: string;
}

export class UpdateSchoolDayDto extends BaseSchoolDayDto {}

export class FindAllSchoolDaysDto {
  @IsUUID()
  @IsNotEmpty()
  class_id: string;
}
