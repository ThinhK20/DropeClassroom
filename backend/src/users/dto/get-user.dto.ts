import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { User } from 'src/shared/schemas/user.schema';

// export class UserClassDto {
//   @IsNotEmpty()
//   readonly userId: User;

//   @IsEnum(ROLE_CLASS)
//   readonly role: ROLE_CLASS;
// }

export class GetUserDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  users: User[];
}
