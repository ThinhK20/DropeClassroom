import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GradeReview } from './schemas/grade-review.schema';

@Injectable()
export class GradeReviewsService {
  constructor(
    @InjectModel(GradeReview.name)
    private gradeReviewModel: mongoose.Model<GradeReview>,
  ) {}

  async getAllGradeReviews(): Promise<GradeReview[]> {
    // const gradeReviews = await this.gradeReviewModel.populate('GradeReviewDocument');
    // if (!assignment) throw new NotFoundException('Assignment not found');
    // return assignment;
    return null;
  }
}
