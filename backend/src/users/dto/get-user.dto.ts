import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { ROLE_CLASS } from 'src/shared/enums';
import { User } from 'src/shared/schemas/user.schema';

export class UserClassDto {
  @IsNotEmpty()
  readonly userId: User;

  @IsEnum(ROLE_CLASS)
  readonly role: ROLE_CLASS;
}

export class GetUserDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserClassDto)
  users: UserClassDto[];
}
