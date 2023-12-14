import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: mongoose.Model<Assignment>,
  ) {}

  async createNewAssignment(assignmentDTO: Assignment): Promise<Assignment> {
    const res = await this.assignmentModel.create(assignmentDTO);
    return res;
  }

  async getAssignmentAll(): Promise<Assignment[]> {
    const assignments = await this.assignmentModel.find();
    return assignments;
  }

  async getAssignmentById(id: string): Promise<Assignment> {
    const assignments = await this.assignmentModel.findById(id);
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
    const assignment = await this.assignmentModel.findByIdAndDelete(id);
    return assignment;
  }

  async updateAssignmentById(
    id: string,
    assignmentDTO: Assignment,
  ): Promise<Assignment> {
    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
      id,
      assignmentDTO,
      { new: true },
    );
    if (!updatedAssignment) throw new NotFoundException('Assignment not found');
    return updatedAssignment;
  }
}
