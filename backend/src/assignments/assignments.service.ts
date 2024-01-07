import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentStatus } from 'enums/AssignmentStatus.enum';
import { StudentAssignment } from 'src/student-assignment/schemas/student-assignment.schema';
import { ClassroomService } from 'src/classroom/classroom.service';
import { ROLE_CLASS } from 'src/shared/enums';
import { GradeReview } from 'src/grade-reviews/schemas/grade-review.schema';
import { StudentAssignmentService } from 'src/student-assignment/student-assignment.service';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: mongoose.Model<Assignment>,
    @InjectModel(StudentAssignment.name)
    private studentAssignmentsModel: mongoose.Model<StudentAssignment>,
    @InjectModel(GradeReview.name)
    private gradeReviewsModel: mongoose.Model<GradeReview>,
    private classroomService: ClassroomService,
    private studentAssignmentService: StudentAssignmentService,
  ) {}

  async createNewAssignment(
    assignment: CreateAssignmentDto,
  ): Promise<Assignment> {
    const users = (
      await this.classroomService.getAllUser(assignment.assignmentClassId)
    ).filter((u) => u.role === ROLE_CLASS.Student);

    const res = await this.assignmentModel.create({
      ...assignment,
    });

    users.forEach(async (user) => {
      await this.studentAssignmentService.createStudentAssignmentsByStudentId(
        user._id as any,
      );
      // await this.studentAssignmentsModel.create({
      //   assignmentId: res._id,
      //   studentId: (user as any)._id,
      // });
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
    const studentAssignments = await this.studentAssignmentsModel.find({
      assignmentId: id,
    });

    const gradeReviewPromises = studentAssignments.map(async (sa) => {
      return await this.gradeReviewsModel.deleteMany({
        studentAssignment: sa._id,
      });
    });

    await Promise.all(gradeReviewPromises);

    await this.studentAssignmentsModel.deleteMany({ assignmentId: id });

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
    await this.assignmentModel.findByIdAndUpdate(id, {
      assignmentStatus: status,
    });
    await this.studentAssignmentsModel.updateMany(
      { assignmentId: id },
      { status: AssignmentStatus.Completed },
    );
    return true;
  }
}
