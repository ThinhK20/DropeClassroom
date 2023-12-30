import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentType } from './schemas/comments.schema';

@Controller('comments')
export class CommentsController {
  // Assignment service is automatically created when initializing the controller
  constructor(private commentsService: CommentsService) {}

  @Get()
  async getAllComments(): Promise<CommentType[]> {
    return await this.commentsService.getAllComments();
  }

  @Get()
  async getAllCommentsByGradeReviewId(
    @Query('grade-review') gradeReviewId: string,
  ): Promise<CommentType[]> {
    return await this.commentsService.getAllCommentsByGradeReviewId(
      gradeReviewId,
    );
  }

  @Post('create')
  async addNewComment(@Body() comment: CommentType): Promise<CommentType> {
    try {
      return await this.commentsService.addNewComment(comment);
    } catch (ex) {
      console.error(ex);
    }
  }

  @Delete('delete/grade-review/:id')
  async deleteAllCommentsByGradeReviewId(
    @Param('id') gradeReviewId: string,
  ): Promise<boolean> {
    try {
      return await this.commentsService.deleteCommentsByGradeReviewId(
        gradeReviewId,
      );
    } catch (ex) {
      console.error(ex);
    }
  }

  @Delete('delete/each/:id')
  async deleteCommentByCommentId(
    @Param('id') commentId: string,
  ): Promise<boolean> {
    try {
      return await this.commentsService.deleteCommentByCommentId(commentId);
    } catch (ex) {
      console.error(ex);
    }
  }
}
