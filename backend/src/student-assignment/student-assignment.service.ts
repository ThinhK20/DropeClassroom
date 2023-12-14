import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { StudentAssignment } from './schemas/student-assignment.schema';
import { StudentAssignmentDto } from './dto/student-assignment.dto';

@Injectable()
export class StudentAssignmentService {
  constructor(
    @InjectModel(StudentAssignment.name)
    private studentAssignmentModel: mongoose.Model<StudentAssignment>,
  ) {}

  async createNewAssignment(
    assignmentDTO: StudentAssignmentDto,
  ): Promise<StudentAssignment> {
    const res = await this.studentAssignmentModel.create(assignmentDTO);
    return res;
  }

  async getAssignmentAll(): Promise<StudentAssignment[]> {
    const assignments = await this.studentAssignmentModel
      .find()
      .populate('studentId');
    return assignments;
  }

  async getAssignmentById(id: string): Promise<StudentAssignment> {
    const assignment = await this.studentAssignmentModel.findById(id);
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async deleteAssignmentById(id: string): Promise<StudentAssignment> {
    const assignment = await this.studentAssignmentModel.findByIdAndDelete(id);
    return assignment;
  }

  async updateAssignmentById(
    assignmentDTO: StudentAssignmentDto,
  ): Promise<StudentAssignment> {
    const updatedAssignment =
      await this.studentAssignmentModel.findByIdAndUpdate(
        assignmentDTO._id,
        assignmentDTO,
        {
          new: true,
        },
      );
    if (!updatedAssignment)
      throw new NotFoundException('Student assignment not found');
    return updatedAssignment;
  }
}
