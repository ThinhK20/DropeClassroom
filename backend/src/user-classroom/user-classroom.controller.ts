import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { UserClassroomDto } from './dto';
import { UserClassroom } from './schemas/user-classroom.schema';
import { UserClassroomService } from './user-classroom.service';

@Controller('uic')
export class UserClassroomController {
  constructor(private userClassroomService: UserClassroomService) {}

  @UseGuards(SessionGuard)
  @Post()
  async insertUserClass(@Body() dto: UserClassroomDto): Promise<UserClassroom> {
    return this.userClassroomService.insertUserClass(dto);
  }
}
