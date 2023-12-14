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
import {
  AddUserClassroomDto,
  CreateClassDto,
  JoinClassDto,
  UpdateClassDto,
} from './dto';
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

  // create new class
  // Post: .../c
  @UseGuards(SessionGuard)
  @Post()
  async createNewClass(
    @GetUser() owner: User,
    @Body() classroom: CreateClassDto,
  ): Promise<Classroom> {
    return this.classroomService.createNewClass(owner, classroom);
  }

  // Get all classes of current user
  // Get: .../c/all
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

  // Get: ../c/uic/all
  @UseGuards(SessionGuard)
  @Get(':id/uic')
  async getAllUser(@Param('id') id: string): Promise<UserClassroom[]> {
    return this.classroomService.getAllUser(id);
  }

  // Post: ../c/:id/uic
  @UseGuards(SessionGuard)
  @Post(':id/uic')
  async addUserClass(
    @Param('id') id: string,
    @GetUser() owner: User,
    @Body() dto: AddUserClassroomDto,
  ): Promise<UserClassroom> {
    return this.classroomService.addUserClass(owner, dto, id);
  }

  // Delete: ../c/:id/uic
  @UseGuards(SessionGuard)
  @Post(':id/rm-uic')
  async deleteUserClass(
    @Param('id') id: string,
    @GetUser() owner: User,
    @Body('user') u: string,
  ): Promise<UserClassroom> {
    return this.classroomService.deleteUserClass(owner, u, id);
  }
}

// export make public
