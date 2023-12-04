import { IsOptional, IsString } from 'class-validator';

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  readonly className: string;

  @IsOptional()
  @IsString()
  readonly section: string;

  @IsOptional()
  @IsString()
  readonly room: string;

  @IsOptional()
  @IsString()
  readonly subject: string;
}
