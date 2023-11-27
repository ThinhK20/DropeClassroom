import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Assignment } from 'src/schemas/assignment.schema';

@Injectable() // this is "Dependency Injection"
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
    const assignment = await this.assignmentModel.findById(id);
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async deleteAssignmentById(id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findByIdAndDelete(id);
    return assignment;
  }
}
