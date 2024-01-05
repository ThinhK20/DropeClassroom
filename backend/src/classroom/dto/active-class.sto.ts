import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ActiveClassDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;
}
