import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentStatus } from 'enums/AssignmentStatus.enum';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: mongoose.Model<Assignment>,
  ) {}

  async createNewAssignment(
    assignment: CreateAssignmentDto,
  ): Promise<Assignment> {
    const res = await this.assignmentModel.create({
      ...assignment,
    });
    return res;
  }

  async getAssignmentAll(): Promise<Assignment[]> {
    const assignments = await this.assignmentModel.find();
    return assignments;
  }

  async getAssignmentById(id: string): Promise<Assignment> {
    const assignments = await this.assignmentModel
      .findById(id)
      .select('-createdAt -updatedAt -__v');
    if (!assignments) throw new NotFoundException('Assignment not found');
    return assignments;
  }

  async getAssignmentByClassId(id: string): Promise<Assignment[]> {
    const assignments = await this.assignmentModel.find({
      assignmentClassId: { $eq: id },
    });
    if (!assignments) throw new NotFoundException('Assignment not found');
    return assignments;
  }

  async deleteAssignmentById(id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findOneAndDelete({
      _id: id,
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async updateAssignmentById(
    id: string,
    updateAssignment: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const assignment = await this.assignmentModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...updateAssignment,
      },
      {
        new: true,
      },
    );
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async updateAssignmentStatus(
    id: string,
    status: AssignmentStatus,
  ): Promise<boolean> {
    return await this.assignmentModel.findByIdAndUpdate(id, {
      assignmentStatus: status,
    });
  }
}
