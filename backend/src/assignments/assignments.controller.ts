import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AssignmentService } from './assignments.service';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentStatus } from 'enums/AssignmentStatus.enum';

@Controller('assignment')
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

  @Put('update/status')
  async updateAssignmentStatus(
    @Query('id') id,
    @Query('status') status: AssignmentStatus,
  ): Promise<boolean> {
    try {
      await this.assignmentService.updateAssignmentStatus(id, status);
      return true;
    } catch {
      return false;
    }
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
  @Get('class/:id')
  async getAssignmentsByClassId(
    @Param('id') _id: string,
  ): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentByClassId(_id);
  }

  // update: .../assignments/_id
  @Post(':id')
  async updateAssignmentById(
    @Param('id') _id: string,
    @Body() assignment: UpdateAssignmentDto,
  ): Promise<Assignment> {
    return this.assignmentService.updateAssignmentById(_id, assignment);
  }

  // Delete: .../assignments/_id
  @Delete(':id')
  async deleteAssignmentById(@Param('id') _id: string): Promise<Assignment> {
    return this.assignmentService.deleteAssignmentById(_id);
  }
}
