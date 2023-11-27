import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AssignmentService } from './assignments.service';
import { Assignment } from 'src/schemas/assignment.schema';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('assignments')
export class AssignmentController {
  // Assignment service is automatically created when initializing the controller
  constructor(private assignmentService: AssignmentService) {}

  // some request from client
  // Post: .../assignments/create
  @Post('create') // create new assignment
  async createNewAssignment(
    @Body() assignment: CreateAssignmentDto,
  ): Promise<Assignment> {
    return this.assignmentService.createNewAssignment(assignment);
  }

  // Get: .../assignments
  @Get()
  async getAssignmentAll(): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentAll();
  }

  // Get: .../assignments/_id
  @Get(':id')
  async getAssignmentById(@Param('id') _id: string): Promise<Assignment> {
    return this.assignmentService.getAssignmentById(_id);
  }

  // Delete: .../assignments/_id
  @Delete(':id')
  async deleteAssignmentById(@Param('id') _id: string): Promise<Assignment> {
    return this.assignmentService.deleteAssignmentById(_id);
  }
}
