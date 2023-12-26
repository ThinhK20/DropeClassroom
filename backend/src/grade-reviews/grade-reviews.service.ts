import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GradeReview } from './schemas/grade-review.schema';
import { CreateGradeReview } from './dto/create-grade-review.dto';

@Injectable()
export class GradeReviewsService {
  constructor(
    @InjectModel(GradeReview.name)
    private gradeReviewModel: mongoose.Model<GradeReview>,
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

  async updateGradeReview(gradeReview: GradeReview): Promise<boolean> {
    const result = await this.gradeReviewModel.findOneAndUpdate(gradeReview);
    return result ? true : false;
  }

  async deleteGradeReview(id: string): Promise<boolean> {
    return await this.gradeReviewModel.findByIdAndDelete(id);
  }
}
