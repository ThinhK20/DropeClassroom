/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentAssignmentDto } from './dto/student-assignment.dto';
import { StudentAssignmentService } from './student-assignment.service';
import { StudentAssignment } from './schemas/student-assignment.schema';

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
  @Get('assignment/:id')
  async getStudentAssignmentById(
    @Param('id') _id: any,
  ): Promise<StudentAssignment> {
    return await this.studentAssignmentService.getAssignmentById(_id);
  }

  @Get('class')
  async getStudentAssignmentsByClassId(
    @Query('id') id,
    @Query('group') isGroup,
    @Query('calculated') isCalculated,
  ): Promise<StudentAssignment[]> {
    if (!isCalculated || isCalculated === 'false') {
      return await this.studentAssignmentService.getAllAssignmentsByClassId(id);
    }

    if (!isGroup || isGroup === 'false') {
      return await this.studentAssignmentService.getAllAssignmentsGroupByClassId(
        id,
      );
    } else {
      return await this.studentAssignmentService.getAllGroupStudentAssignmentsByClassId(
        id,
      );
    }
  }

  @Put('update/:id') // create new assignment
  async updateStudentAssignment(
    @Param('id') id: any,
    @Body() studentAssignment: StudentAssignment,
  ): Promise<StudentAssignment> {
    return await this.studentAssignmentService.updateAssignmentById(
      id,
      studentAssignment,
    );
  }

  @Put('updateByBody') // create new assignment
  async updateAssignmentByAssignmentIdAndStudentId(
    @Body() studentAssignment: StudentAssignment,
  ): Promise<StudentAssignment> {
    return await this.studentAssignmentService.updateAssignmentByAssignmentIdAndStudentId(
      studentAssignment,
    );
  }

  // Delete: .../assignments/_id
  @Delete(':id')
  async deleteStudentAssignmentById(
    @Param('id') _id: string,
  ): Promise<StudentAssignment> {
    return this.studentAssignmentService.deleteAssignmentById(_id);
  }
}
