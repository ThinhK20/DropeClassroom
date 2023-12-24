import { Controller, Get } from '@nestjs/common';
import { GradeReviewsService } from './grade-reviews.service';

@Controller('grade-reviews')
export class GradeReviewsController {
  // Assignment service is automatically created when initializing the controller
  constructor(private gradeReviewsService: GradeReviewsService) {}

  @Get()
  async getAssignmentAll(): Promise<string> {
    return 'Hello assignment';
  }
}
