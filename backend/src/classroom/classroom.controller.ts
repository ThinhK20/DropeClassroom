import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from 'src/schemas/classroom.schema';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('classroom')
export class ClassroomController {
  // Classroom service is automatically created when initializing the controller
  constructor(private classroomService: ClassroomService) {}

  // some request from client
  // Post: .../classroom/create
  @Post('create') // create new class
  async createNewClass(@Body() classroom: CreateClassDto): Promise<Classroom> {
    return this.classroomService.crateNewClass(classroom);
  }

  // Get: .../classroom
  @Get()
  async getClassAll(): Promise<Classroom[]> {
    return this.classroomService.getClassAll();
  }

  // Get: .../classroom/_id
  @Get(':id')
  async getClassById(@Param('id') _id: string): Promise<Classroom> {
    return this.classroomService.getClassById(_id);
  }

  // Delete: .../classroom/_id
  @Delete(':id')
  async deleteClassById(@Param('id') _id: string): Promise<Classroom> {
    return this.classroomService.deleteClassById(_id);
  }
}

// export make public
