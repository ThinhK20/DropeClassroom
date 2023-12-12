import { IsEnum, IsNotEmpty } from 'class-validator';
import { ROLE_CLASS } from 'src/shared/enums';
import { User } from 'src/shared/schemas/user.schema';

export class AddUserClassroomDto {
  @IsNotEmpty()
  readonly userId: User;

  @IsEnum(ROLE_CLASS)
  readonly role: ROLE_CLASS;
}
