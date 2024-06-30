import {
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAnnotationsDto {
  @IsUUID()
  @IsNotEmpty()
  school_day_id: string;
}

export class UpdateAnnotationsDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
