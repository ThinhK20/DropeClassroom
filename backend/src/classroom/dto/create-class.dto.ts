import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
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
