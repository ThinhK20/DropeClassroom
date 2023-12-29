import { IsEnum, IsNotEmpty } from 'class-validator';
import { ROLE_CLASS } from 'src/shared/enums';
import { User } from 'src/shared/schemas/user.schema';
import { Classroom } from '../schemas/classroom.schema';

export class AddUserClassroomDto {
  @IsNotEmpty()
  readonly userId: User;

  @IsEnum(ROLE_CLASS)
  readonly role: ROLE_CLASS;
}

export class inviteListUserDto {
  @IsNotEmpty()
  readonly classId: Classroom;

  @IsNotEmpty()
  readonly userId: User;

  @IsEnum(ROLE_CLASS)
  readonly role: ROLE_CLASS;

  readonly isActive: boolean = false;
}
