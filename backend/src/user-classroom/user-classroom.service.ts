import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserClassroom } from './schemas/user-classroom.schema';
import mongoose from 'mongoose';

import { UserClassroomDto } from './dto/user-classroom.dto';

@Injectable()
export class UserClassroomService {
  constructor(
    @InjectModel(UserClassroom.name)
    private userClassroomModel: mongoose.Model<UserClassroom>,
  ) {}

  // create user in class room with roles
  async insertUserClass(dto: UserClassroomDto): Promise<UserClassroom> {
    try {
      console.log(dto);
      // console.log(
      //   await this.userClassroomModel
      //     .findById('656a251e60dea2469d31f1fc')
      //     .populate('classId'),
      // );
      return await this.userClassroomModel.create(dto);
      // return await this.userClassroomModel.create(dto);
    } catch (err) {
      throw new Error('Error creating instance: ' + err.message);
    }
  }
}
