import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import { CreateClassDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/shared/schemas/user.schema';
import { SessionGuard } from 'src/auth/guards/session.guard';

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

  // Get class of current user
  // Get: .../c
  @UseGuards(SessionGuard)
  @Get('all')
  async getClassOfUser(@GetUser() user: User): Promise<Classroom[]> {
    return this.classroomService.getClassOfUser(user);
  }

  // Get: .../c/_id
  @UseGuards(SessionGuard)
  @Get('c/:id')
  async getClassByClassId(@Param('id') _id: string): Promise<Classroom> {
    return this.classroomService.getClassById(_id);
  }

  // Delete: .../c/_id
  @UseGuards(SessionGuard)
  @Delete(':id')
  async deleteClassById(@Param('id') _id: string): Promise<Classroom> {
    return this.classroomService.deleteClassById(_id);
  }
}

// export make public
