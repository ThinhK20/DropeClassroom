import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CommentType } from './schemas/comments.schema';
import { GradeReview } from 'src/grade-reviews/schemas/grade-review.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(GradeReview.name)
    private gradeReviewModel: mongoose.Model<GradeReview>,
    @InjectModel(CommentType.name)
    private commentModel: mongoose.Model<CommentType>,
  ) {}

  async getAllComments(): Promise<CommentType[]> {
    const comments = await this.commentModel.find().populate({
      path: 'userClassroom',
      populate: [{ path: 'userId' }],
    });
    return comments;
  }

  async getAllCommentsByGradeReviewId(
    gradeReviewId: string,
  ): Promise<CommentType[]> {
    const comments = await this.commentModel
      .find({
        gradeReview: gradeReviewId,
      })
      .populate({
        path: 'userClassroom',
        populate: [{ path: 'userId' }],
      });

    return comments;
  }

  async addNewComment(comment: CommentType): Promise<CommentType> {
    const res = await this.commentModel.create(comment);
    return res;
  }

  async deleteCommentByCommentId(commentId: string): Promise<boolean> {
    return await this.commentModel.findByIdAndDelete(commentId);
  }

  async deleteCommentsByGradeReviewId(gradeReviewId: string): Promise<boolean> {
    const comments = await this.commentModel.find({
      gradeReview: gradeReviewId,
    });
    await this.commentModel.deleteMany({
      _id: comments.map((comment) => comment._id),
    });
    return true;
  }
}
