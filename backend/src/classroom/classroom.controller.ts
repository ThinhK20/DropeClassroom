import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import {
  AddUserClassroomDto,
  inviteListUserDto,
  CreateClassDto,
  JoinClassDto,
  UpdateClassDto,
} from './dto';
import { GetUser, Roles } from 'src/auth/decorator';
import { User } from 'src/shared/schemas/user.schema';
import { SessionGuard } from 'src/auth/guards/session.guard';
import {
  getAllClassResponse,
  userClassResponse,
} from 'src/shared/types/response.type';
import { UserClassroom } from 'src/user-classroom/schemas/user-classroom.schema';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLE_CLASS, Role } from 'src/shared/enums';

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

  // Join class by link
  @UseGuards(SessionGuard)
  @Get(':id/v1')
  async joinClassByLink_v1(
    @GetUser() u: User,
    @Param('id') id: string,
    @Query('cjc') cjc: string,
    @Query('role') role: ROLE_CLASS,
  ): Promise<UserClassroom> {
    const isValidFormat = /^[a-zA-Z0-9]{6}$/.test(cjc as string);

    if (!isValidFormat) throw new BadRequestException('cjc not valid');

    return this.classroomService._joinClassByLink_v1(u, id, cjc, role);
  }

  // Invite class
  @UseGuards(SessionGuard)
  @Post(':id/invite')
  async inviteUser(
    @GetUser() owner: User,
    @Body() dto: inviteListUserDto[],
    @Param('id') id: string,
  ): Promise<UserClassroom[]> {
    return this.classroomService.inviteUserClass(owner, dto, id);
  }

  // Accept invite
  @UseGuards(SessionGuard)
  @Post(':id/accept')
  async accpetUser(
    @GetUser() owner: User,
    @Param('id') id: string,
    @Query('cjc') cjc: string,
    @Query('role') role: ROLE_CLASS,
  ): Promise<UserClassroom> {
    return this.classroomService.acceptInviteUserClass(owner, id, cjc, role);
  }

  // get all class by admin
  @Roles(Role.Admin)
  @UseGuards(SessionGuard, RolesGuard)
  @Get('ad/all')
  async getAllClassByAdmin(): Promise<Classroom[]> {
    return this.classroomService.getAllClasses();
  }
}

// export make public
