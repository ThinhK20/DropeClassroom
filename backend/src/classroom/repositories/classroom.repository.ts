import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { Classroom } from '../schemas/classroom.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClassroomRepository extends BaseRepository<Classroom> {
  constructor(
    @InjectModel(Classroom.name)
    private readonly classroomModel: Model<Classroom>,
  ) {
    super(classroomModel);
  }
}
