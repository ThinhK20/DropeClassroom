import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentAssignmentDto } from './dto/student-assignment.dto';
import { StudentAssignmentService } from './student-assignment.service';
import { StudentAssignment } from './schemas/student-assignment.schema';
import { UpdateStudentAssignmentDto } from './dto/update-student-assignment.dto';

@Controller('student-assignments')
export class StudentAssignmentController {
  // Assignment service is automatically created when initializing the controller
  constructor(private studentAssignmentService: StudentAssignmentService) {}

  // some request from client
  // Post: .../assignments/create
  @Post('create') // create new assignment
  async createNewStudentAssignment(
    @Body() studentAssignment: StudentAssignmentDto,
  ): Promise<StudentAssignment> {
    return this.studentAssignmentService.createNewAssignment(studentAssignment);
  }

  // Get: .../assignments
  @Get()
  async getStudentAssignmentsAll(): Promise<StudentAssignment[]> {
    return this.studentAssignmentService.getAssignmentAll();
  }

  // Get: .../assignments/_id
  @Get(':id')
  async getStudentAssignmentById(
    @Param('id') _id: string,
  ): Promise<StudentAssignment> {
    return this.studentAssignmentService.getAssignmentById(_id);
  }

  @Put('update') // create new assignment
  async updateStudentAssignment(
    @Body() studentAssignment: UpdateStudentAssignmentDto,
  ): Promise<void> {
    console.log('Student assignemnt: ', studentAssignment);
    // return this.studentAssignmentService.createNewAssignment(studentAssignment);
  }

  // Delete: .../assignments/_id
  @Delete(':id')
  async deleteStudentAssignmentById(
    @Param('id') _id: string,
  ): Promise<StudentAssignment> {
    return this.studentAssignmentService.deleteAssignmentById(_id);
  }
}
