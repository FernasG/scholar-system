import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAttendanceListDto {
  @IsUUID()
  @IsNotEmpty()
  school_day_id: string;
}

export class UpdateAttendanceListDto {
  @IsBoolean()
  @IsNotEmpty()
  attendance: boolean;
}

export class FindAllAttendanceListsDto {
  @IsUUID()
  @IsNotEmpty()
  school_day_id: string;
}
