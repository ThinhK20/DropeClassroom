import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import { CreateClassDto, JoinClassDto, UpdateClassDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/shared/schemas/user.schema';
import { SessionGuard } from 'src/auth/guards/session.guard';
import {
  getAllClassResponse,
  userClassResponse,
} from 'src/shared/types/response.type';
import { UserClassroom } from 'src/user-classroom/schemas/user-classroom.schema';

@Controller('c')
export class ClassroomController {
  // Classroom service is automatically created when initializing the controller
  constructor(private classroomService: ClassroomService) {}

  // some request from client
  // create new class
  // Post: .../
  @UseGuards(SessionGuard)
  @Post()
  async createNewClass(
    @GetUser() owner: User,
    @Body() classroom: CreateClassDto,
  ): Promise<Classroom> {
    return this.classroomService.createNewClass(owner, classroom);
  }

  // Get all classes of current user
  // Get: .../c
  @UseGuards(SessionGuard)
  @Get('all')
  async getClassOfUser(
    @GetUser() user: User,
  ): Promise<getAllClassResponse<UserClassroom>> {
    return this.classroomService.getClassOfUser(user);
  }

  // Update info class
  // PATCH: ../c/_id
  @UseGuards(SessionGuard)
  @Patch(':id')
  async updateClassOfUser(
    @GetUser() owner: User,
    @Param('id') _id: string,
    @Body() updateClass: UpdateClassDto,
  ): Promise<Classroom> {
    return this.classroomService.updateClassOfUser(owner, _id, updateClass);
  }

  // Get: .../c/_id
  @UseGuards(SessionGuard)
  @Get(':id')
  async getClassByClassId(@Param('id') _id: string): Promise<Classroom> {
    return this.classroomService.getClassById(_id);
  }

  // Delete: .../c/_id
  @UseGuards(SessionGuard)
  @Delete(':id')
  async deleteClassById(@Param('id') _id: string): Promise<Classroom> {
    return this.classroomService.deleteClassById(_id);
  }

  // Post: .../c/uic
  @UseGuards(SessionGuard)
  @Post('uic')
  async joinClassBycode(
    @GetUser() user,
    @Body() code: JoinClassDto,
  ): Promise<userClassResponse<Classroom>> {
    return this.classroomService.joinClassByCode(user, code);
  }
}

// export make public
