import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { UserClassroomDto } from './dto';
import { UserClassroom } from './schemas/user-classroom.schema';
import { UserClassroomService } from './user-classroom.service';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/shared/schemas/user.schema';
import { ROLE_CLASS } from 'src/shared/enums';

@Controller('uic')
export class UserClassroomController {
  constructor(private userClassroomService: UserClassroomService) {}

  @UseGuards(SessionGuard)
  @Post()
  async createUserClass(@Body() dto: UserClassroomDto): Promise<UserClassroom> {
    return this.userClassroomService.createUserClass(dto);
  }

  @UseGuards(SessionGuard)
  @Get('/')
  async getAllTeachingClass(
    @GetUser() dto: User,
    @Query('role') role: ROLE_CLASS,
  ): Promise<UserClassroom[]> {
    return this.userClassroomService.getAllClassWithRole(dto, role);
  }

  @Get('/get/:id')
  async getSpecificUserClassroom(
    @Param('id') id: string,
  ): Promise<UserClassroom> {
    return this.userClassroomService.getUser(id);
  }

  @Get('/specific')
  async getUserClassroomByUserIdAndClassId(
    @Query('userId') userId: string,
    @Query('classId') classId: string,
  ): Promise<UserClassroom> {
    return this.userClassroomService.getUserByUserIdAndClassId(userId, classId);
  }
}
