import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GradeReviewsService } from './grade-reviews.service';
import { GradeReview } from './schemas/grade-review.schema';
import { CreateGradeReview } from './dto/create-grade-review.dto';

@Controller('grade-reviews')
export class GradeReviewsController {
  // Assignment service is automatically created when initializing the controller
  constructor(private gradeReviewsService: GradeReviewsService) {}

  @Get()
  async getAllGradeReviews(): Promise<GradeReview[]> {
    return await this.gradeReviewsService.getAllGradeReviews();
  }

  @Get('class/:id')
  async getAllGradeReviewsByClassId(
    @Param('id') id: string,
  ): Promise<GradeReview[]> {
    return await this.gradeReviewsService.getAllGradeReviewsByClassId(id);
  }

  @Post('create')
  async createGradeReview(
    @Body() gradeReview: CreateGradeReview,
  ): Promise<GradeReview> {
    try {
      return await this.gradeReviewsService.createGradeReview(gradeReview);
    } catch (ex) {
      console.error(ex);
    }
  }

  @Put('update')
  async updateGradeReview(@Body() gradeReview: GradeReview): Promise<boolean> {
    try {
      return await this.gradeReviewsService.updateGradeReview(gradeReview);
    } catch (ex) {
      console.error(ex);
    }
  }

  @Delete(':id')
  async deleteGradeReview(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.gradeReviewsService.deleteGradeReview(id);
    } catch (ex) {
      console.error(ex);
    }
  }

  @Post('accept')
  async acceptGradeReview(@Body() gradeReview: GradeReview): Promise<boolean> {
    try {
      return await this.gradeReviewsService.acceptGradeReview(gradeReview);
    } catch (ex) {
      console.log(ex);
    }
  }
}
