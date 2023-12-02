import { IsEnum, IsNotEmpty } from 'class-validator';
import { ROLE_CLASS } from 'src/shared/enums';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import { User } from 'src/shared/schemas/user.schema';

export class UserClassroomDto {
  @IsNotEmpty()
  readonly classId: Classroom;

  @IsNotEmpty()
  readonly userId: User;

  @IsEnum(ROLE_CLASS)
  readonly role: ROLE_CLASS;
}
