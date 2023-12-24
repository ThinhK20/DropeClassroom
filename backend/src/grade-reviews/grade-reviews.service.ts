import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GradeReview } from './schemas/grade-review.schema';
import { CreateGradeReview } from './dto/create-grade-review.dto';
import { StudentAssignmentService } from 'src/student-assignment/student-assignment.service';

@Injectable()
export class GradeReviewsService {
  constructor(
    @InjectModel(GradeReview.name)
    private gradeReviewModel: mongoose.Model<GradeReview>,
    private studentAssignmentsService: StudentAssignmentService,
  ) {}

  async getAllGradeReviews(): Promise<GradeReview[]> {
    const gradeReviews = await this.gradeReviewModel
      .find()
      .populate('studentAssignment');

    return gradeReviews;
  }

  async getAllGradeReviewsByClassId(classId: string): Promise<GradeReview[]> {
    const gradeReviews = await this.gradeReviewModel
      .find({ classId })
      .populate({
        path: 'studentAssignment',
        populate: [
          {
            path: 'studentId',
            populate: {
              path: 'userId',
            },
          },
          {
            path: 'assignmentId',
          },
        ],
      });
    return gradeReviews;
  }

  async createGradeReview(
    gradeReview: CreateGradeReview,
  ): Promise<GradeReview> {
    const result = await this.gradeReviewModel.create(gradeReview);
    return result;
  }

  async deleteGradeReview(id: string): Promise<boolean> {
    return await this.gradeReviewModel.findByIdAndDelete(id);
  }
}
